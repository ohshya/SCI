import logging
from datetime import datetime
from uuid import uuid4

import jwt
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel

from core.logger import log_event
from core.permissions import get_effective_permissions, require_permission
from core.settings import TIMEZONE
from models.user_sessions import UserSession
from models.users import Users
from security.auth import (
    create_user_session,
    get_current_user,
    get_current_user_or_master,
)
from security.cookies import remove_token_cookies, set_token_cookies
from security.helpers import verify_password
from security.master import MASTER_USER_ID, verify_master_credentials
from security.tokens import (
    create_access_token,
    create_refresh_token,
    validate_access_token_format,
    validate_refresh_token_format,
)


class UserLogin(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    details: str


class UserMeResponse(BaseModel):
    id: int
    username: str
    is_active: bool
    is_admin: bool


class SessionResponse(BaseModel):
    id: str
    user_agent: str
    ip_address: str | None
    location: str | None
    created_at: datetime
    last_activity: datetime
    expires_at: datetime


authRouter = APIRouter(tags=["Authentication"], prefix="/auth")


@authRouter.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin, request: Request, response: Response):
    if verify_master_credentials(user_data.username, user_data.password):
        master_session_id = str(uuid4())
        access_token, _ = create_access_token(
            MASTER_USER_ID, master_session_id, is_master=True
        )
        refresh_token, _, _ = create_refresh_token(
            MASTER_USER_ID, master_session_id, is_master=True
        )
        set_token_cookies(response, access_token, refresh_token)
        await log_event(request, "login", "Acceso master utilizado", user_id=None)
        return {"details": "Login exitoso"}

    user = await Users.filter(username=user_data.username).first()
    if not user:
        raise HTTPException(status_code=401, detail={"code": "AUTH001", "toast": True})
    if not verify_password(user_data.password, user.password):
        await log_event(
            request,
            "access_denied",
            f"Intento de login fallido para {user_data.username}",
            user_id=None,
        )
        raise HTTPException(status_code=401, detail={"code": "AUTH001", "toast": True})
    if not user.is_active:
        raise HTTPException(status_code=403, detail={"code": "AUTH002", "toast": True})
    _, access_token, refresh_token = await create_user_session(
        user_id=user.id,
        user_agent_raw=request.headers.get("user-agent"),
        ip_address=request.client.host if request.client else None,
    )
    set_token_cookies(response, access_token, refresh_token)
    await log_event(request, "login", f"{user.username} ha iniciado sesión", user.id)
    return {"details": "Login exitoso"}


@authRouter.post("/logout")
async def logout(
    request: Request,
    response: Response,
    user: Users = Depends(get_current_user),
):
    access_token = request.cookies.get("access_token")
    if access_token:
        try:
            payload = validate_access_token_format(access_token)
            session_id = payload["session_id"]
            session = await UserSession.filter(id=session_id, user_id=user.id).first()
            if session:
                await session.delete()
        except Exception as e:
            logging.error(
                f"Error inesperado al eliminar sesión en logout: {e}", exc_info=True
            )
    remove_token_cookies(response)
    await log_event(
        request, "logout", f"Cierre de sesión para {user.username}", user.id
    )
    return {"details": "Logout exitoso"}


@authRouter.get("/me", response_model=UserMeResponse)
async def get_me(user: Users = Depends(get_current_user_or_master)):
    return {
        "id": user.id,
        "username": user.username,
        "is_active": user.is_active,
        "is_admin": user.is_admin,
    }


@authRouter.get("/sessions", response_model=list[SessionResponse])
async def list_sessions(user: Users = Depends(get_current_user)):
    sessions = await UserSession.filter(user_id=user.id).all()
    return sessions


@authRouter.delete("/sessions/{session_id}")
async def close_session(
    session_id: str,
    request: Request,
    response: Response,
    user: Users = Depends(get_current_user),
):
    session = await UserSession.filter(id=session_id, user_id=user.id).first()
    if not session:
        raise HTTPException(status_code=404, detail={"code": "AUTH003", "toast": True})
    current_access_token = request.cookies.get("access_token")
    if current_access_token:
        try:
            payload = validate_access_token_format(current_access_token)
            current_session_id = payload["session_id"]
            if current_session_id == session_id:
                remove_token_cookies(response)
        except (jwt.InvalidTokenError, KeyError, ValueError) as e:
            logging.warning(f"Error al validar token actual en close_session: {e}")
        except Exception as e:
            logging.error(
                f"Error inesperado al validar token actual: {e}", exc_info=True
            )
    await session.delete()
    return {"details": "Sesión cerrada"}


@authRouter.post("/sessions/all", status_code=200)
async def close_all_other_sessions(
    request: Request,
    response: Response,
    user: Users = Depends(get_current_user),
):
    current_session_id = getattr(request.state, "session_id", None)
    if not current_session_id:
        access_token = request.cookies.get("access_token")
        if access_token:
            try:
                payload = validate_access_token_format(access_token)
                current_session_id = payload["session_id"]
            except (jwt.InvalidTokenError, KeyError, ValueError) as e:
                logging.warning(f"Error al validar token para obtener session_id: {e}")
                current_session_id = None
            except Exception as e:
                logging.error(
                    f"Error inesperado al obtener session_id: {e}", exc_info=True
                )
                current_session_id = None
    if not current_session_id:
        raise HTTPException(status_code=401, detail={"code": "AUTH004", "toast": True})
    other_sessions = (
        await UserSession.filter(user_id=user.id).exclude(id=current_session_id).all()
    )
    for session in other_sessions:
        await session.delete()
    return {
        "details": f"Se cerraron {len(other_sessions)} sesiones (excepto la actual)"
    }


@authRouter.delete("/sessions/all/{user_id}", status_code=200)
async def close_all_sessions_of_user(
    user_id: int,
    request: Request,
    response: Response,
    current_admin: Users = Depends(require_permission(7)),
):
    user = await Users.filter(id=user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail={"code": "3x01a", "toast": True})
    sessions = await UserSession.filter(user_id=user_id).all()
    for session in sessions:
        await session.delete()
    return {
        "details": f"Se cerraron {len(sessions)} sesiones del usuario {user.username}"
    }


@authRouter.get("/permissions", response_model=list[int])
async def get_my_permissions(user: Users = Depends(get_current_user_or_master)):
    return await get_effective_permissions(user)


@authRouter.post("/refresh")
async def refresh_tokens(request: Request, response: Response):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail={"code": "AUTH005", "toast": True})

    payload = validate_refresh_token_format(refresh_token)
    if payload.get("is_master"):
        master_session_id = str(uuid4())
        new_access, _ = create_access_token(
            MASTER_USER_ID, master_session_id, is_master=True
        )
        new_refresh, _, _ = create_refresh_token(
            MASTER_USER_ID, master_session_id, is_master=True
        )
        set_token_cookies(response, new_access, new_refresh)
        return {"details": "Tokens renovados"}
    try:
        payload = validate_refresh_token_format(refresh_token)
        user_id = int(payload["sub"])
        session_id = payload["session_id"]
        token_jti = payload["jti"]
        session = await UserSession.filter(id=session_id, user_id=user_id).first()
        if not session:
            raise HTTPException(
                status_code=401, detail={"code": "AUTH006", "toast": True}
            )
        if session.is_expired():
            await session.delete()
            raise HTTPException(
                status_code=401, detail={"code": "AUTH007", "toast": True}
            )
        if session.refresh_token_jti != token_jti:
            raise HTTPException(
                status_code=401, detail={"code": "AUTH008", "toast": True}
            )
        user = await Users.filter(id=user_id, is_active=True).first()
        if not user:
            raise HTTPException(
                status_code=401, detail={"code": "AUTH009", "toast": True}
            )
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
        return {"details": "Tokens renovados"}
    except HTTPException:
        raise
    except (jwt.InvalidTokenError, KeyError, ValueError) as e:
        logging.warning(f"Error de token en refresh: {e}")
        raise HTTPException(status_code=401, detail={"code": "AUTH010", "toast": True})
