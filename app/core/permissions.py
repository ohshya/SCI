from dataclasses import dataclass
from typing import Optional

from fastapi import Depends, HTTPException

from models.roles import Role
from models.users import Users
from security.auth import get_current_user, get_current_user_or_master


@dataclass(frozen=True)
class Permission:
    id: int
    name: str
    description: str


PERMISSIONS: dict[int, Permission] = {
    p.id: p
    for p in [
        Permission(1, "users:list", "Ver el usuarios"),
        Permission(2, "users:create", "Crear usuarios"),
        Permission(3, "users:update", "Editar usuarios"),
        Permission(4, "users:disable", "Deshabilitar usuarios"),
        Permission(5, "users:delete", "Eliminar usuarios"),
        Permission(6, "users:change_password", "Cambiar contraseña"),
        Permission(7, "sessions:close_all_of_user", "Cerrar sesiones"),
        Permission(8, "audit:view_logs", "Ver el historial"),
        Permission(9, "audit:view_errors", "Ver de códigos de error"),
        Permission(
            10,
            "audit:verify_log",
            "Registro de auditoría",
        ),
        Permission(11, "roles:list", "Ver roles y permisos"),
        Permission(12, "roles:create", "Crear nuevos roles"),
        Permission(13, "roles:update", "Editar roles y sus permisos"),
        Permission(14, "roles:delete", "Eliminar roles"),
    ]
}


def list_permissions() -> list[Permission]:
    return sorted(PERMISSIONS.values(), key=lambda p: p.id)


def get_permission(permission_id: int) -> Optional[Permission]:
    return PERMISSIONS.get(permission_id)


async def has_permission(user, permission_id: int) -> bool:
    if getattr(user, "is_master", False):
        return True
    if user.is_admin:
        return True
    if not user.role_id:
        return False
    role = await Role.filter(id=user.role_id).first()
    if not role:
        return False
    return permission_id in (role.permissions or [])


async def user_has_permission(user_id: int, permission_id: int) -> bool:
    user = await Users.filter(id=user_id).first()
    if not user:
        return False
    return await has_permission(user, permission_id)


async def get_effective_permissions(user) -> list[int]:
    if getattr(user, "is_master", False) or user.is_admin:
        return [p.id for p in list_permissions()]
    if not user.role_id:
        return []
    role = await Role.filter(id=user.role_id).first()
    if not role:
        return []
    return sorted(role.permissions or [])


def require_permission(permission_id: int):
    async def dependency(current_user=Depends(get_current_user_or_master)) -> Users:
        if not await has_permission(current_user, permission_id):
            raise HTTPException(
                status_code=401, detail={"code": "PERM001", "toast": True}
            )
        return current_user

    return dependency
