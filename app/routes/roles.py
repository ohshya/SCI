from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, field_validator

from core.logger import log_event
from core.permissions import get_permission, list_permissions, require_permission
from models.roles import Role
from models.users import Users

rolesRouter = APIRouter(tags=["Roles"], prefix="/roles")


class PermissionResponse(BaseModel):
    id: int
    name: str
    description: str


class RoleCreate(BaseModel):
    name: str
    description: str | None = None
    permissions: List[int] = []

    @field_validator("permissions")
    def validate_permissions(cls, v: List[int]):
        for permission_id in v:
            if get_permission(permission_id) is None:
                raise HTTPException(
                    status_code=400, detail={"code": "PERM002", "toast": True}
                )
        return sorted(set(v))


class RoleUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    permissions: List[int] | None = None

    @field_validator("permissions")
    def validate_permissions(cls, v):
        if v is None:
            return v
        for permission_id in v:
            if get_permission(permission_id) is None:
                raise HTTPException(
                    status_code=400, detail={"code": "PERM002", "toast": True}
                )
        return sorted(set(v))


class RoleResponse(BaseModel):
    id: int
    name: str
    description: str | None
    permissions: List[int]
    created_at: datetime

    class Config:
        from_attributes = True


@rolesRouter.get("/permissions", response_model=List[PermissionResponse])
async def get_permissions_catalog(
    current_user: Users = Depends(require_permission(11)),
):
    return [
        {"id": p.id, "name": p.name, "description": p.description}
        for p in list_permissions()
    ]


@rolesRouter.get("/", response_model=List[RoleResponse])
async def list_roles(current_user: Users = Depends(require_permission(11))):
    return await Role.all().order_by("name")


@rolesRouter.get("/{role_id}", response_model=RoleResponse)
async def get_role_detail(
    role_id: int, current_user: Users = Depends(require_permission(11))
):
    role = await Role.filter(id=role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail={"code": "3x01a", "toast": True})
    return role


@rolesRouter.post("/", response_model=RoleResponse, status_code=201)
async def create_role(
    role_data: RoleCreate,
    request: Request,
    current_user: Users = Depends(require_permission(12)),
):
    existing = await Role.filter(name=role_data.name).first()
    if existing:
        raise HTTPException(status_code=400, detail={"code": "PERM003", "toast": True})
    role = await Role.create(
        name=role_data.name,
        description=role_data.description,
        permissions=role_data.permissions,
    )
    await log_event(
        request,
        "create",
        f"Rol creado: {role.name} (ID: {role.id})",
        user_id=current_user.id,
    )
    return role


@rolesRouter.patch("/{role_id}", response_model=RoleResponse)
async def update_role(
    role_id: int,
    role_data: RoleUpdate,
    request: Request,
    current_user: Users = Depends(require_permission(13)),
):
    role = await Role.filter(id=role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail={"code": "3x01a", "toast": True})
    update_data = role_data.model_dump(exclude_unset=True)
    if "name" in update_data and update_data["name"] is not None:
        duplicate = await Role.filter(name=update_data["name"]).first()
        if duplicate and duplicate.id != role_id:
            raise HTTPException(
                status_code=400, detail={"code": "PERM003", "toast": True}
            )
    for field, value in update_data.items():
        setattr(role, field, value)
    await role.save()
    await log_event(
        request,
        "update",
        f"Rol actualizado: {role.name} (ID: {role.id})",
        user_id=current_user.id,
    )
    return role


@rolesRouter.delete("/{role_id}", status_code=200)
async def delete_role(
    role_id: int,
    request: Request,
    current_user: Users = Depends(require_permission(14)),
):
    role = await Role.filter(id=role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail={"code": "3x01a", "toast": True})
    await Users.filter(role_id=role_id).update(role_id=None)
    await role.delete()
    await log_event(
        request,
        "delete",
        f"Rol eliminado: {role.name} (ID: {role_id})",
        user_id=current_user.id,
    )
    return {"message": "Rol eliminado correctamente"}
