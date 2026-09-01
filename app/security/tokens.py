from datetime import datetime, timedelta
from typing import Any
from uuid import uuid4

import jwt
from fastapi import HTTPException

from core.settings import TIMEZONE, settings


def create_access_token(
    user_id: int, session_id: str, is_master: bool = False
) -> tuple[str, str]:
    jti = str(uuid4())
    payload = {
        "sub": str(user_id),
        "jti": jti,
        "type": "access",
        "iss": settings.domain,
        "session_id": session_id,
        "is_master": is_master,
        "iat": datetime.now(TIMEZONE),
        "exp": datetime.now(TIMEZONE) + timedelta(minutes=settings.access_expire),
    }
    token = jwt.encode(payload, settings.key, algorithm=settings.algorithm)
    return token, jti


def create_refresh_token(
    user_id: int, session_id: str, is_master: bool = False
) -> tuple[str, str, datetime]:
    jti = str(uuid4())
    expires = datetime.now(TIMEZONE) + timedelta(days=settings.refresh_expire)
    payload = {
        "sub": str(user_id),
        "jti": jti,
        "type": "refresh",
        "iss": settings.domain,
        "session_id": session_id,
        "is_master": is_master,
        "iat": datetime.now(TIMEZONE),
        "exp": expires,
    }
    token = jwt.encode(payload, settings.key, algorithm=settings.algorithm)
    return token, jti, expires


def decode_token(token: str) -> dict[str, Any]:
    try:
        return jwt.decode(
            token,
            settings.key,
            algorithms=[settings.algorithm],
            issuer=settings.domain,
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, detail={"code": "AUTH011", "toast": True})
    except jwt.InvalidTokenError:
        raise HTTPException(401, detail={"code": "AUTH012", "toast": True})


def validate_access_token_format(token: str) -> dict[str, Any]:
    payload = decode_token(token)
    if payload.get("type") != "access":
        raise HTTPException(401, detail={"code": "AUTH012", "toast": True})
    sub = payload.get("sub")
    if sub is None or not sub.isdigit():
        raise HTTPException(401, detail={"code": "AUTH012", "toast": True})
    session_id = payload.get("session_id")
    if session_id is None or len(session_id) != 36:
        raise HTTPException(401, detail={"code": "AUTH012", "toast": True})
    jti = payload.get("jti")
    if jti is None or len(jti) != 36:
        raise HTTPException(401, detail={"code": "AUTH012", "toast": True})
    return payload


def validate_refresh_token_format(token: str) -> dict[str, Any]:
    payload = decode_token(token)
    if payload.get("type") != "refresh":
        raise HTTPException(401, detail={"code": "AUTH012", "toast": True})
    sub = payload.get("sub")
    if sub is None or not sub.isdigit():
        raise HTTPException(401, detail={"code": "AUTH012", "toast": True})
    session_id = payload.get("session_id")
    if session_id is None or len(session_id) != 36:
        raise HTTPException(401, detail={"code": "AUTH012", "toast": True})
    jti = payload.get("jti")
    if jti is None or len(jti) != 36:
        raise HTTPException(401, detail={"code": "AUTH012", "toast": True})
    return payload
