import asyncio
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
import re
from getpass import getpass

from core.database import TORTOISE_ORM
from models.users import Users
from security.helpers import hash_password
from tortoise import Tortoise


def validate_username(username: str) -> bool:
    if not username or len(username.strip()) == 0:
        print("❌ El nombre de usuario no puede estar vacío")
        return False
    if len(username) < 3:
        print("❌ El nombre de usuario debe tener al menos 3 caracteres")
        return False
    if not re.match(r"^[a-zA-Z0-9_]+$", username):
        print(
            "❌ El nombre de usuario solo puede contener letras, números y guión bajo"
        )
        return False
    return True


def validate_password(password: str) -> bool:
    if not password or len(password.strip()) == 0:
        print("❌ La contraseña no puede estar vacía")
        return False
    if len(password) < 6:
        print("❌ La contraseña debe tener al menos 6 caracteres")
        return False
    return True


async def create_admin_user():
    print("\n" + "=" * 50)
    print("  CREAR USUARIO ADMINISTRADOR")
    print("=" * 50 + "\n")
    try:
        await Tortoise.init(config=TORTOISE_ORM)
        await Tortoise.generate_schemas()

        print("📝 Ingresa los datos del administrador:\n")
        while True:
            username = input("Nombre de usuario: ").strip()
            if validate_username(username):
                existing = await Users.filter(username=username).first()
                if existing:
                    print(
                        f"❌ El usuario '{username}' ya existe. Por favor, elige otro.\n"
                    )
                else:
                    break

        while True:
            password = getpass("Contraseña: ")
            if validate_password(password):
                password_confirm = getpass("Confirmar contraseña: ")
                if password == password_confirm:
                    break
                else:
                    print("❌ Las contraseñas no coinciden. Intenta de nuevo.\n")

        print("\n" + "-" * 50)
        print("📋 Resumen:")
        print(f"   Usuario: {username}")
        print(f"   Rol: Administrador")
        print(f"   Estado: Activo")
        print("-" * 50)
        confirm = input("\n¿Crear este usuario? (s/N): ").strip().lower()
        if confirm != "s":
            print("\n❌ Operación cancelada.")
            return

        hashed_password = hash_password(password)
        new_admin = Users(
            username=username,
            password=hashed_password,
            is_active=True,
            is_admin=True,
        )
        await new_admin.save()
        print(f"\n✅ Usuario administrador creado exitosamente!")
        print(f"   ID: {new_admin.id}")
        print(f"   Usuario: {new_admin.username}")
        print(f"   Rol: {'Administrador' if new_admin.is_admin else 'Usuario'}")
    except Exception as e:
        print(f"\n❌ Error al crear el usuario: {str(e)}")
        sys.exit(1)
    finally:
        await Tortoise.close_connections()


if __name__ == "__main__":
    asyncio.run(create_admin_user())
