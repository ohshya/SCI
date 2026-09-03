from datetime import datetime
from typing import TYPE_CHECKING

from tortoise.fields import (
    CharField,
    DatetimeField,
    IntField,
    JSONField,
    ReverseRelation,
    TextField,
)
from tortoise.models import Model

from core.settings import TIMEZONE

if TYPE_CHECKING:
    from models.users import Users


class Role(Model):
    id = IntField(pk=True)
    name = CharField(max_length=100, unique=True, null=False)
    description = TextField(null=True)
    permissions = JSONField(default=list)
    created_at = DatetimeField(default=lambda: datetime.now(TIMEZONE))
    users: ReverseRelation["Users"]

    class Meta(Model.Meta):
        table = "roles"
