import hmac

from core.settings import settings

MASTER_USER_ID = 0


class MasterUser:
    id = MASTER_USER_ID
    username = settings.master_username
    is_active = True
    is_admin = True
    role_id = None
    is_master = True


def verify_master_credentials(username: str, password: str) -> bool:
    if not settings.master_password:
        return False
    user_ok = hmac.compare_digest(username, settings.master_username)
    pass_ok = hmac.compare_digest(password, settings.master_password)
    return user_ok and pass_ok
