import bcrypt

from core.settings import settings


def hash_password(password: str) -> str:
    combined = f"{password}{settings.key}".encode()
    return bcrypt.hashpw(combined, bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str) -> bool:
    combined = f"{password}{settings.key}".encode()
    return bcrypt.checkpw(combined, hashed.encode())
