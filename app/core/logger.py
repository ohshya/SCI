import logging
from typing import Literal, Optional

from fastapi import Request
from models.audit_logs import AuditLog

LOGS_OPTIONS = Literal[
    "login",
    "logout",
    "create",
    "update",
    "disable",
    "delete",
    "error",
    "password_change",
    "access_denied",
    "system",
]


async def log_event(
    request: Optional[Request],
    log_type: LOGS_OPTIONS,
    message: str,
    user_id: Optional[int] = None,
    error_code: Optional[str] = None,
) -> None:
    ip_address = (
        "script"
        if request is None
        else (request.client.host if request.client else "unknown")
    )

    try:
        log_entry = AuditLog(
            user_id=user_id,
            type=log_type,
            message=message,
            ip=ip_address,
            error_code=error_code,
        )
        await log_entry.save()
    except Exception as e:
        logging.error(f"Error al registrar log en BD: {str(e)}")
