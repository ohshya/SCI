from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, field_validator

from core.logger import log_event
from models.users import Users
from security.auth import get_current_admin_user
from security.helpers import hash_password


class UserCreate(BaseModel):
    username: str
    password: str
    is_admin: bool | None = False

    @field_validator("password")
    def validate_password(cls, v):
        if len(v) < 6:
            raise HTTPException(
                status_code=400, detail={"code": "6x01a", "toast": True}
            )
        return v


class UserUpdate(BaseModel):
    username: str | None = None
    is_active: bool | None = None
    is_admin: bool | None = None


class UserResponse(BaseModel):
    id: int
    username: str
    is_active: bool
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True


class PasswordChange(BaseModel):
    new_password: str

    @field_validator("new_password")
    def validate_new_password(cls, v: str):
        if len(v) < 6:
            raise HTTPException(
                status_code=400, detail={"code": "6x01a", "toast": True}
            )
        return v


usersRouter = APIRouter(tags=["Users"], prefix="/users")


@usersRouter.get("/", response_model=List[UserResponse])
async def list_users(
    is_active: Optional[bool] = None,
    is_admin: Optional[bool] = None,
    search: Optional[str] = None,
    current_user: Users = Depends(get_current_admin_user),
):
    query = Users.all()
    if is_active is not None:
        query = query.filter(is_active=is_active)
    if is_admin is not None:
        query = query.filter(is_admin=is_admin)
    if search:
        query = query.filter(username__icontains=search)
    return await query


@usersRouter.post("/", response_model=UserResponse, status_code=201)
async def create_user(
    user_data: UserCreate,
    request: Request,
    current_user: Users = Depends(get_current_admin_user),
):
    existing = await Users.filter(username=user_data.username).first()
    if existing:
        raise HTTPException(status_code=400, detail={"code": "2x01a", "toast": True})
    try:
        new_user = Users(
            username=user_data.username,
            password=hash_password(user_data.password),
            is_admin=user_data.is_admin or False,
        )
        await new_user.save()
        await log_event(
            request,
            "create",
            f"Usuario creado: {new_user.username} (ID: {new_user.id})",
            user_id=new_user.id,
        )
        return new_user
    except Exception as e:
        await log_event(
            request, "error", f"Error al crear usuario: {str(e)}", error_code="5x01a"
        )
        raise HTTPException(status_code=500, detail={"code": "5x01a", "toast": True})


@usersRouter.patch("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    user_data: UserUpdate,
    request: Request,
    current_user: Users = Depends(get_current_admin_user),
):
    user = await Users.filter(id=user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail={"code": "3x01a", "toast": True})
    update_data = user_data.model_dump(exclude_unset=True)
    if "username" in update_data and update_data["username"] is not None:
        verify_username = await Users.filter(username=update_data["username"]).first()
        if verify_username and verify_username.id != user_id:
            raise HTTPException(
                status_code=400, detail={"code": "2x02a", "toast": True}
            )
    if (
        "is_admin" in update_data
        and update_data["is_admin"] is False
        and user.id == current_user.id
    ):
        raise HTTPException(status_code=403, detail={"code": "1x01a", "toast": True})
    try:
        for field, value in update_data.items():
            setattr(user, field, value)
        await user.save()
        await log_event(
            request,
            "update",
            f"Usuario actualizado: {user.username} : {user.id}",
            user_id=user.id,
        )
        return user
    except Exception as e:
        await log_event(
            request,
            "error",
            f"Error al actualizar usuario: {str(e)}",
            error_code="5x02a",
        )
        raise HTTPException(status_code=500, detail={"code": "5x02a", "toast": True})


@usersRouter.patch("/disable/{user_id}", status_code=200)
async def disable_user(
    user_id: int,
    request: Request,
    current_user: Users = Depends(get_current_admin_user),
):
    user = await Users.filter(id=user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail={"code": "3x01a", "toast": True})
    try:
        user.is_active = False
        await user.save()
        await log_event(
            request,
            "disable",
            f"Usuario deshabilitado: {user.username} : {user.id}",
            user_id=user.id,
        )
        return {"message": "Usuario deshabilitado correctamente"}
    except Exception as e:
        await log_event(
            request,
            "error",
            f"Error al deshabilitar usuario: {str(e)}",
            error_code="5x03a",
        )
        raise HTTPException(status_code=500, detail={"code": "5x03a", "toast": True})

@usersRouter.delete("/{user_id}", status_code=200)
async def delete_user(
    user_id: int,
    request: Request,
    current_user: Users = Depends(get_current_admin_user),
):
    user = await Users.filter(id=user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail={"code": "3x01a", "toast": True})
    if user.id == current_user.id:
        raise HTTPException(status_code=400, detail={"code": "4x01a", "toast": True})
    saved_user_id = user.id
    saved_username = user.username
    try:
        await user.delete()
        await log_event(
            request,
            "delete",
            f"Usuario eliminado: {saved_username} (ID: {saved_user_id})",
            user_id=current_user.id,
        )
        return {"message": "Usuario eliminado correctamente"}
    except Exception as e:
        await log_event(
            request, "error", f"Error al eliminar usuario: {str(e)}", error_code="5x04a"
        )
        raise HTTPException(status_code=500, detail={"code": "5x04a", "toast": True})

@usersRouter.post("/{user_id}/password", status_code=200)
async def change_password(
    user_id: int,
    password_data: PasswordChange,
    request: Request,
    current_user: Users = Depends(get_current_admin_user),
):
    user = await Users.filter(id=user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail={"code": "3x01a", "toast": True})
    try:
        user.password = hash_password(password_data.new_password)
        await user.save()
        await log_event(
            request,
            "password_change",
            f"Contraseña cambiada para usuario: {user.username} : {user.id}",
            user_id=user.id,
        )
        return {"message": "Contraseña cambiada exitosamente"}
    except Exception as e:
        await log_event(
            request,
            "error",
            f"Error al cambiar contraseña: {str(e)}",
            error_code="5x05a",
        )
        raise HTTPException(status_code=500, detail={"code": "5x05a", "toast": True})
