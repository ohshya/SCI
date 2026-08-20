import {
  For,
  Show,
  createSignal,
  createResource,
  createEffect,
} from "solid-js";
import { createForm, setValues, reset } from "@modular-forms/solid";
import toast, { Toaster } from "solid-toast";
import { useAuth } from "@/context/auth";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Input } from "@/components/ui/Input";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineKey,
  AiOutlineUserAdd,
  AiOutlinePoweroff,
} from "solid-icons/ai";
import {
  UsersApi,
  type UserResponse,
  type UserCreate,
  type UserUpdate,
} from "@/api/users.api";

export const UsersList = () => {
  const { user } = useAuth();
  const [search, setSearch] = createSignal("");
  const [isActive, setIsActive] = createSignal<boolean | undefined>(undefined);
  const [isAdmin, setIsAdmin] = createSignal<boolean | undefined>(undefined);
  const [showAddModal, setShowAddModal] = createSignal(false);
  const [showEditModal, setShowEditModal] = createSignal(false);
  const [showPasswordModal, setShowPasswordModal] = createSignal(false);
  const [selectedUser, setSelectedUser] = createSignal<UserResponse | null>(
    null,
  );

  const [users, { refetch }] = createResource(
    () => ({ search: search(), is_active: isActive(), is_admin: isAdmin() }),
    UsersApi.getUsers,
  );

  createEffect(() => {
    refetch();
  });

  const [addFormStore, { Form: AddForm, Field: AddField }] =
    createForm<UserCreate>({
      validateOn: "blur",
      validate: (values) => {
        const errors: Partial<Record<keyof UserCreate, string>> = {};
        if (!values.username?.trim()) errors.username = "Requerido";
        if (!values.password) errors.password = "Requerido";
        if (values.password && values.password.length < 6)
          errors.password = "Mínimo 6 caracteres";
        return errors;
      },
    });

  const [editFormStore, { Form: EditForm, Field: EditField }] =
    createForm<UserUpdate>({
      validateOn: "blur",
      validate: (values) => {
        const errors: Partial<Record<keyof UserUpdate, string>> = {};
        if (values.username && !values.username.trim())
          errors.username = "No puede estar vacío";
        return errors;
      },
    });

  const [passwordFormStore, { Form: PasswordForm, Field: PasswordField }] =
    createForm<{ new_password: string }>({
      validateOn: "blur",
      validate: (values) => {
        const errors: Partial<{ new_password: string }> = {};
        if (!values.new_password) errors.new_password = "Requerido";
        if (values.new_password && values.new_password.length < 6)
          errors.new_password = "Mínimo 6 caracteres";
        return errors;
      },
    });

  const handleAddUser = async (values: UserCreate) => {
    try {
      await UsersApi.createUser({
        ...values,
        username: values.username.trim(),
      });
      refetch();
      setShowAddModal(false);
      toast.success("Usuario creado exitosamente");
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail?.message || "Error al crear usuario",
      );
    }
  };

  const handleUpdateUser = async (values: UserUpdate) => {
    if (!selectedUser()) return;
    try {
      await UsersApi.updateUser(selectedUser()!.id, {
        ...values,
        username: values.username?.trim(),
      });
      refetch();
      setShowEditModal(false);
      toast.success("Usuario actualizado correctamente");
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail?.message || "Error al actualizar usuario",
      );
    }
  };

  const handleChangePassword = async (values: { new_password: string }) => {
    if (!selectedUser()) return;
    try {
      await UsersApi.changeUserPassword(
        selectedUser()!.id,
        values.new_password,
      );
      setShowPasswordModal(false);
      toast.success("Contraseña actualizada exitosamente");
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail?.message || "Error al cambiar contraseña",
      );
    }
  };

  const handleToggleActive = async (targetUser: UserResponse) => {
    try {
      if (targetUser.is_active) {
        await UsersApi.disableUser(targetUser.id);
        toast.error(`Usuario ${targetUser.username} deshabilitado`);
      } else {
        await UsersApi.updateUser(targetUser.id, { is_active: true });
        toast.success(`Usuario ${targetUser.username} habilitado`);
      }
      refetch();
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail?.message || "Error al cambiar estado",
      );
    }
  };

  const handleDeleteUser = async (targetUser: UserResponse) => {
    if (!confirm(`¿Eliminar a ${targetUser.username}?`)) return;
    try {
      await UsersApi.deleteUser(targetUser.id);
      refetch();
      toast.success("Usuario eliminado exitosamente");
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail?.message || "Error al eliminar usuario",
      );
    }
  };

  const handleForceDisconnect = async (targetUser: UserResponse) => {
    if (!confirm(`¿Cerrar todas las sesiones de ${targetUser.username}?`))
      return;
    try {
      await UsersApi.closeAllSessionsOfUser(targetUser.id);
      toast.success(`Sesiones cerradas para ${targetUser.username}`);
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail?.message ||
          "Error al desconectar sesiones",
      );
    }
  };

  return (
    <Show
      when={user()?.is_admin}
      fallback={
        <div class="alert alert-error shadow-sm text-white">
          Requiere permisos de administrador.
        </div>
      }
    >
      {/* Contenedor de notificaciones flotantes en la esquina superior derecha */}
      <Toaster position="top-right" gutter={8} />

      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
          <input
            type="text"
            placeholder="Buscar usuario..."
            class="input input-bordered input-sm w-full sm:w-48"
            value={search()}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
          <button
            type="button"
            class="btn btn-primary btn-sm text-white w-full sm:w-auto gap-1"
            onClick={() => {
              reset(addFormStore);
              setShowAddModal(true);
            }}
          >
            <AiOutlineUserAdd size={16} /> Crear
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="table table-sm w-full">
            <thead>
              <tr>
                <th>Username</th>
                <th>Estado</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <Show when={users.loading}>
                <tr>
                  <td colspan="4" class="text-center">
                    Cargando...
                  </td>
                </tr>
              </Show>
              <For each={users()}>
                {(u) => (
                  <tr>
                    <td class="font-bold">{u.username}</td>
                    <td>
                      <span
                        class={`badge badge-sm ${u.is_active ? "badge-success" : "badge-error"}`}
                      >
                        {u.is_active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>
                      <span
                        class={`badge badge-sm ${u.is_admin ? "badge-primary" : "badge-ghost"}`}
                      >
                        {u.is_admin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td class="flex flex-wrap gap-1">
                      <button
                        class="btn btn-square btn-xs btn-outline"
                        onClick={() => {
                          setSelectedUser(u);
                          setValues(editFormStore, {
                            username: u.username,
                            is_active: u.is_active,
                            is_admin: u.is_admin,
                          });
                          setShowEditModal(true);
                        }}
                        title="Editar"
                      >
                        <AiOutlineEdit size={14} />
                      </button>
                      <button
                        class="btn btn-square btn-xs btn-outline"
                        onClick={() => {
                          setSelectedUser(u);
                          reset(passwordFormStore);
                          setShowPasswordModal(true);
                        }}
                        title="Password"
                      >
                        <AiOutlineKey size={14} />
                      </button>
                      <button
                        class={`btn btn-square btn-xs ${u.is_active ? "btn-warning" : "btn-success"}`}
                        onClick={() => handleToggleActive(u)}
                        title={u.is_active ? "Deshabilitar" : "Habilitar"}
                      >
                        <AiOutlinePoweroff size={14} />
                      </button>
                      <button
                        class="btn btn-square btn-xs btn-error text-white"
                        onClick={() => handleForceDisconnect(u)}
                        title="Cerrar sesiones de este usuario"
                      >
                        <AiOutlinePoweroff size={14} />
                      </button>
                      <button
                        class="btn btn-square btn-xs btn-error text-white"
                        onClick={() => handleDeleteUser(u)}
                        title="Eliminar"
                      >
                        <AiOutlineDelete size={14} />
                      </button>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>

        <dialog class={`modal ${showAddModal() ? "modal-open" : ""}`}>
          <div class="modal-box max-w-sm">
            <h3 class="font-bold text-lg mb-2">Agregar Usuario</h3>
            <AddForm onSubmit={handleAddUser}>
              <AddField name="username">
                {(field, props) => (
                  <Input
                    label="Nombre de usuario"
                    value={field.value}
                    error={field.error}
                    {...props}
                  />
                )}
              </AddField>
              <AddField name="password">
                {(field, props) => (
                  <PasswordInput
                    label="Contraseña"
                    value={field.value}
                    error={field.error}
                    {...props}
                  />
                )}
              </AddField>
              <AddField name="is_admin" type="boolean">
                {(field, props) => (
                  <label class="label cursor-pointer gap-2 justify-start mt-2">
                    <input
                      type="checkbox"
                      class="checkbox checkbox-primary checkbox-sm"
                      checked={field.value || false}
                      onChange={(e) => props.onChange(e)}
                    />
                    <span class="label-text">Administrador</span>
                  </label>
                )}
              </AddField>
              <div class="modal-action">
                <button type="submit" class="btn btn-primary btn-sm text-white">
                  Crear
                </button>
                <button
                  type="button"
                  class="btn btn-sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </AddForm>
          </div>
        </dialog>

        <dialog class={`modal ${showEditModal() ? "modal-open" : ""}`}>
          <div class="modal-box max-w-sm">
            <h3 class="font-bold text-lg mb-2">Editar Usuario</h3>
            <Show when={selectedUser()}>
              <EditForm onSubmit={handleUpdateUser}>
                <EditField name="username">
                  {(field, props) => (
                    <Input
                      label="Nombre de usuario"
                      value={field.value}
                      error={field.error}
                      {...props}
                    />
                  )}
                </EditField>
                <EditField name="is_active" type="boolean">
                  {(field, props) => (
                    <label class="label cursor-pointer gap-2 justify-start mt-2">
                      <input
                        type="checkbox"
                        class="checkbox checkbox-primary checkbox-sm"
                        checked={field.value ?? false}
                        onChange={(e) => props.onChange(e)}
                      />
                      <span class="label-text">Activo</span>
                    </label>
                  )}
                </EditField>
                <EditField name="is_admin" type="boolean">
                  {(field, props) => (
                    <label class="label cursor-pointer gap-2 justify-start">
                      <input
                        type="checkbox"
                        class="checkbox checkbox-primary checkbox-sm"
                        checked={field.value ?? false}
                        onChange={(e) => props.onChange(e)}
                      />
                      <span class="label-text">Administrador</span>
                    </label>
                  )}
                </EditField>
                <div class="modal-action">
                  <button
                    type="submit"
                    class="btn btn-primary btn-sm text-white"
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </EditForm>
            </Show>
          </div>
        </dialog>

        <dialog class={`modal ${showPasswordModal() ? "modal-open" : ""}`}>
          <div class="modal-box max-w-sm">
            <h3 class="font-bold text-lg mb-2">Cambiar Contraseña</h3>
            <Show when={selectedUser()}>
              <p class="text-sm mb-2">
                Usuario:{" "}
                <span class="font-bold">{selectedUser()?.username}</span>
              </p>
              <PasswordForm onSubmit={handleChangePassword}>
                <PasswordField name="new_password">
                  {(field, props) => (
                    <PasswordInput
                      label="Nueva contraseña"
                      value={field.value}
                      error={field.error}
                      {...props}
                    />
                  )}
                </PasswordField>
                <div class="modal-action">
                  <button
                    type="submit"
                    class="btn btn-primary btn-sm text-white"
                  >
                    Cambiar
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </PasswordForm>
            </Show>
          </div>
        </dialog>
      </div>
    </Show>
  );
};