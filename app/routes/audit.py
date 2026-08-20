from datetime import datetime
from enum import Enum
from typing import get_args

from fastapi import APIRouter, Depends, HTTPException
from fastapi_pagination import Page, add_pagination
from fastapi_pagination.ext.tortoise import apaginate
from pydantic import BaseModel, field_validator

from core.error_codes import ERROR_CODES, GENERIC_MESSAGES
from core.logger import LOGS_OPTIONS
from models.audit_logs import AuditLog
from models.users import Users
from security.auth import get_current_admin_user

auditRouter = APIRouter(tags=["Audit"], prefix="/audit")


class LogResponse(BaseModel):
    id: int
    user_id: int | None
    type: str
    message: str
    ip: str
    error_code: str | None
    hash: str
    created_at: datetime

    class Config:
        from_attributes = True


class LogFilter(BaseModel):
    user_id: int | None = None
    type: str | None = None
    search: str | None = None
    ip: str | None = None
    before_date: datetime | None = None
    after_date: datetime | None = None

    @field_validator("type")
    def validate_log_type(cls, v: str):
        if v and v.lower() not in get_args(LOGS_OPTIONS):
            raise ValueError("Tipo de log inválido")
        return v.lower() if v else None


class SortOrder(str, Enum):
    ASC = "asc"
    DESC = "desc"
    RECENT = "recent"
    OLDEST = "oldest"
    A_Z = "a-z"
    Z_A = "z-a"


@auditRouter.get("/logs", response_model=Page[LogResponse])
async def get_logs(
    current_user: Users = Depends(get_current_admin_user),
    filters: LogFilter = Depends(),
    sort_by: str = "created_at",
    sort_order: SortOrder = SortOrder.DESC,
):
    query = AuditLog.all()
    if filters.user_id:
        query = query.filter(user_id=filters.user_id)
    if filters.type:
        query = query.filter(type=filters.type)
    if filters.search:
        query = query.filter(message__icontains=filters.search)
    if filters.ip:
        query = query.filter(ip__icontains=filters.ip)
    if filters.before_date:
        query = query.filter(created_at__lte=filters.before_date)
    if filters.after_date:
        query = query.filter(created_at__gte=filters.after_date)

    valid_sort_fields = {"created_at", "type", "message"}
    if sort_by not in valid_sort_fields:
        sort_by = "created_at"

    if sort_order in [SortOrder.ASC, SortOrder.A_Z, SortOrder.OLDEST]:
        query = query.order_by(sort_by)
    else:
        query = query.order_by(f"-{sort_by}")

    return await apaginate(query)


@auditRouter.get("/errors")
async def list_error_codes(current_user: Users = Depends(get_current_admin_user)):
    result = []
    for code, info in ERROR_CODES.items():
        result.append(
            {
                "code": code,
                "description": info["description"],
                "generic_message_id": info["generic"],
                "generic_message": GENERIC_MESSAGES.get(
                    info["generic"], "Mensaje no definido"
                ),
            }
        )
    return result


@auditRouter.get("/logs/{log_id}/verify")
async def verify_log_integrity(
    log_id: int,
    current_user: Users = Depends(get_current_admin_user),
):
    log = await AuditLog.filter(id=log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail={"code": "3x01a", "toast": True})
    is_valid = log.verify_integrity()
    return {"log_id": log_id, "is_integrity_valid": is_valid}


add_pagination(auditRouter)
