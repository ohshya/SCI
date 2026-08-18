from datetime import datetime
from typing import TYPE_CHECKING

from tortoise.fields import (
    BooleanField,
    CharField,
    DatetimeField,
    IntField,
    ReverseRelation,
)
from tortoise.models import Model

from core.settings import TIMEZONE

if TYPE_CHECKING:
    from models.audit_logs import AuditLog
    from models.user_sessions import UserSession


class Users(Model):
    id = IntField(pk=True)
    username = CharField(max_length=255, unique=True, null=False)
    password = CharField(max_length=255, null=False)
    is_active = BooleanField(default=True)
    is_admin = BooleanField(default=False)
    created_at = DatetimeField(default=lambda: datetime.now(TIMEZONE))
    sessions: ReverseRelation["UserSession"]
    audit_logs: ReverseRelation["AuditLog"]

    class Meta(Model.Meta):
        table = "users"
