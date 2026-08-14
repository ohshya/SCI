from core.settings import settings
from fastapi import Response


def set_token_cookies(response: Response, access: str, refresh: str):
    response.set_cookie(
        key="access_token",
        value=access,
        httponly=True,
        secure=True,
        samesite=("lax", "none")[settings.debug],
        max_age=settings.access_expire * 60,
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh,
        httponly=True,
        secure=True,
        samesite=("lax", "none")[settings.debug],
        max_age=settings.refresh_expire * 24 * 3600,
    )


def remove_token_cookies(response: Response):
    response.delete_cookie(
        key="access_token", secure=True, samesite=("lax", "none")[settings.debug]
    )
    response.delete_cookie(
        key="refresh_token", secure=True, samesite=("lax", "none")[settings.debug]
    )
    return None
