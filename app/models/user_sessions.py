import uuid
from datetime import datetime

from tortoise.fields import CASCADE, CharField, DatetimeField, ForeignKeyField
from tortoise.models import Model

from core.settings import TIMEZONE


class UserSession(Model):
    id = CharField(max_length=36, pk=True, default=lambda: str(uuid.uuid4()))
    user = ForeignKeyField(
        "models.Users",
        related_name="sessions",
        on_delete=CASCADE,
        index=True,
    )
    refresh_token_jti = CharField(max_length=36, unique=True, index=True)
    access_token_jti = CharField(max_length=36, unique=True, index=True)
    expires_at = DatetimeField()
    user_agent = CharField(max_length=255, null=True)
    ip_address = CharField(max_length=45, null=True)
    location = CharField(max_length=255, null=True)
    created_at = DatetimeField(default=lambda: datetime.now(TIMEZONE))
    last_activity = DatetimeField(default=lambda: datetime.now(TIMEZONE))

    class Meta(Model.Meta):
        table = "user_sessions"

    def is_expired(self) -> bool:
        return datetime.now(TIMEZONE) > self.expires_at

    async def update_activity(self):
        self.last_activity = datetime.now(TIMEZONE)
        await self.save(update_fields=["last_activity"])
