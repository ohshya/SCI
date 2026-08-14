from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

TORTOISE_ORM = {
    "connections": {"default": "sqlite://./app.db"},
    "apps": {
        "models": {
            "models": [
                "models.users",
                "models.user_sessions",
                "models.audit_logs",
            ],
            "default_connection": "default",
        }
    },
}


def init_db(app: FastAPI):
    register_tortoise(
        app,
        config=TORTOISE_ORM,
        generate_schemas=True,
        add_exception_handlers=True,
    )
