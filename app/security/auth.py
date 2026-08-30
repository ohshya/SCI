from datetime import datetime
from uuid import uuid4

from fastapi import Depends, HTTPException, Request, Response

from core.settings import TIMEZONE
from models.user_sessions import UserSession
from models.users import Users
from security.cookies import remove_token_cookies, set_token_cookies
from security.master import MasterUser
from security.tokens import (
    create_access_token,
    create_refresh_token,
    decode_token,
    validate_access_token_format,
    validate_refresh_token_format,
)
from security.user_agent import get_location_from_ip, parse_user_agent


async def get_current_user_or_master(request: Request, response: Response) -> Users:
    access_token = request.cookies.get("access_token")
    if access_token:
        try:
            payload = decode_token(access_token)
            if payload.get("type") == "access" and payload.get("is_master"):
                return MasterUser()
        except HTTPException:
            pass
    return await get_current_user(request, response)


async def get_current_user(request: Request, response: Response) -> Users:
    access_token = request.cookies.get("access_token")
    refresh_token = request.cookies.get("refresh_token")
    if not access_token and not refresh_token:
        raise HTTPException(status_code=401, detail="No autenticado")

    access_failed = False
    refresh_failed = False

    if access_token:
        try:
            payload = validate_access_token_format(access_token)
            user_id = int(payload["sub"])
            session_id = payload["session_id"]
            token_jti = payload["jti"]

            session = await UserSession.filter(id=session_id, user_id=user_id).first()
            if not session:
                raise HTTPException(status_code=401, detail="Sesión no encontrada")
            if session.is_expired():
                await session.delete()
                raise HTTPException(status_code=401, detail="Sesión expirada")
            if session.access_token_jti != token_jti:
                raise HTTPException(status_code=401, detail="Token inválido")

            user = await Users.filter(id=user_id, is_active=True).first()
            if not user:
                raise HTTPException(status_code=401, detail="Usuario inválido")

            session.last_activity = datetime.now(TIMEZONE)
            await session.save(update_fields=["last_activity"])
            request.state.user = user
            request.state.session_id = session_id
            return user
        except HTTPException:
            access_failed = True
            if not refresh_token:
                remove_token_cookies(response)
                raise

    if refresh_token and (not access_token or access_failed):
        try:
            payload = validate_refresh_token_format(refresh_token)
            user_id = int(payload["sub"])
            session_id = payload["session_id"]
            token_jti = payload["jti"]

            session = await UserSession.filter(id=session_id, user_id=user_id).first()
            if not session:
                raise HTTPException(status_code=401, detail="Sesión no encontrada")
            if session.is_expired():
                await session.delete()
                raise HTTPException(status_code=401, detail="Sesión expirada")
            if session.refresh_token_jti != token_jti:
                raise HTTPException(status_code=401, detail="Token inválido")

            user = await Users.filter(id=user_id, is_active=True).first()
            if not user:
                raise HTTPException(status_code=401, detail="Usuario inválido")

            new_access_token, new_access_jti = create_access_token(user_id, session_id)
            new_refresh_token, new_refresh_jti, new_expires = create_refresh_token(
                user_id, session_id
            )

            session.access_token_jti = new_access_jti
            session.refresh_token_jti = new_refresh_jti
            session.expires_at = new_expires
            session.last_activity = datetime.now(TIMEZONE)
            await session.save(
                update_fields=[
                    "access_token_jti",
                    "refresh_token_jti",
                    "expires_at",
                    "last_activity",
                ]
            )

            set_token_cookies(response, new_access_token, new_refresh_token)
            request.state.user = user
            request.state.session_id = session_id
            return user
        except HTTPException:
            refresh_failed = True
            if (access_failed or not access_token) and refresh_failed:
                remove_token_cookies(response)
            raise

    if (access_token and access_failed) or (refresh_token and refresh_failed):
        remove_token_cookies(response)
    raise HTTPException(status_code=401, detail="No autenticado")


async def get_current_admin_user(
    current_user: Users = Depends(get_current_user),
) -> Users:
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    return current_user


async def create_user_session(
    user_id: int, user_agent_raw: str | None, ip_address: str | None
) -> tuple[UserSession, str, str]:
    session_id = str(uuid4())
    access_token, access_jti = create_access_token(user_id, session_id)
    refresh_token, refresh_jti, expires_at = create_refresh_token(user_id, session_id)

    user_agent_parsed = (
        parse_user_agent(user_agent_raw) if user_agent_raw else "Unknown"
    )
    location = await get_location_from_ip(ip_address) if ip_address else None

    session = UserSession(
        id=session_id,
        user_id=user_id,
        refresh_token_jti=refresh_jti,
        access_token_jti=access_jti,
        expires_at=expires_at,
        user_agent=user_agent_parsed,
        ip_address=ip_address,
        location=location,
    )
    await session.save()
    return session, access_token, refresh_token
