import hashlib
import hmac
from datetime import datetime

from core.settings import TIMEZONE, settings
from tortoise.fields import (
    SET_NULL,
    CharField,
    DatetimeField,
    ForeignKeyField,
    IntField,
    TextField,
)
from tortoise.models import Model


class AuditLog(Model):
    id = IntField(pk=True)
    user = ForeignKeyField(
        "models.Users", related_name="audit_logs", on_delete=SET_NULL, null=True
    )
    type = CharField(max_length=50)
    message = TextField()
    ip = CharField(max_length=45)
    error_code = CharField(max_length=10, null=True)
    hash = CharField(max_length=64, unique=True)
    created_at = DatetimeField(default=lambda: datetime.now(TIMEZONE))

    class Meta(Model.Meta):
        table = "audit_logs"

    async def save(self, *args, **kwargs):
        if self.created_at is None:
            self.created_at = datetime.now(TIMEZONE)
        user_id_val = self.user_id if self.user else ""  # pyright: ignore[reportAttributeAccessIssue]
        data = f"{user_id_val}|{self.type}|{self.message}|{self.ip}|{self.error_code or ''}|{self.created_at.isoformat()}"
        self.hash = hmac.new(
            settings.key.encode(), data.encode(), hashlib.sha256
        ).hexdigest()
        await super().save(*args, **kwargs)

    def verify_integrity(self) -> bool:
        user_id_val = self.user_id if self.user else ""  # pyright: ignore[reportAttributeAccessIssue]
        data = f"{user_id_val}|{self.type}|{self.message}|{self.ip}|{self.error_code or ''}|{self.created_at.isoformat()}"
        expected_hash = hmac.new(
            settings.key.encode(), data.encode(), hashlib.sha256
        ).hexdigest()
        return self.hash == expected_hash
