import pytz
from pydantic_settings import BaseSettings, SettingsConfigDict

TIMEZONE = pytz.timezone("America/Caracas")


class Settings(BaseSettings):
    debug: bool = True
    domain: str = "http://localhost:5173"
    key: str = "UltraSecretKeyWordSuperSecure1234567890"
    algorithm: str = "HS256"
    access_expire: int = 15
    refresh_expire: int = 7
    master_username: str = "root_master"
    master_password: str = ""

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", env_prefix="", case_sensitive=False
    )


settings = Settings()
