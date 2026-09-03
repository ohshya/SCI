import { For, Show, createSignal, createResource } from "solid-js";
import { createForm, setValue, setValues, reset } from "@modular-forms/solid";
import toast, { Toaster } from "solid-toast";
import { useAuth } from "@/context/auth";
import { Input } from "@/components/ui/Input";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "solid-icons/ai";
import {
  RolesApi,
  type RoleResponse,
  type RoleCreate,
  type RoleUpdate,
} from "@/api/roles.api";

type RoleFormValues = {
  name: string;
  description: string;
  permissions: number[];
};

export const RolesList = () => {
  const { hasPermission } = useAuth();
  const [showAddModal, setShowAddModal] = createSignal(false);
  const [showEditModal, setShowEditModal] = createSignal(false);
  const [selectedRole, setSelectedRole] = createSignal<RoleResponse | null>(null);
  const [roles, { refetch }] = createResource(RolesApi.getRoles);
  const [permissions] = createResource(RolesApi.getPermissions);

  const [addFormStore, { Form: AddForm, Field: AddField }] =
    createForm<RoleFormValues>({
      initialValues: { name: "", description: "", permissions: [] },
      validateOn: "blur",
      validate: (values) => {
        const errors: Partial<Record<keyof RoleFormValues, string>> = {};
        if (!values.name?.trim()) errors.name = "Requerido";
        return errors;
      },
    });
  const [editFormStore, { Form: EditForm, Field: EditField }] =
    createForm<RoleFormValues>({
      validateOn: "blur",
      validate: (values) => {
        const errors: Partial<Record<keyof RoleFormValues, string>> = {};
        if (!values.name?.trim()) errors.name = "Requerido";
        return errors;
      },
    });

  const togglePermission = (
    form: typeof addFormStore | typeof editFormStore,
    current: number[] | undefined,
    permissionId: number,
    checked: boolean,
  ) => {
    const set = new Set(current || []);
    if (checked) set.add(permissionId);
    else set.delete(permissionId);
    setValue(form, "permissions", Array.from(set));
  };

  const handleAddRole = async (values: RoleFormValues) => {
    try {
      const payload: RoleCreate = {
        name: values.name.trim(),
        description: values.description?.trim() || undefined,
        permissions: values.permissions || [],
      };
      await RolesApi.createRole(payload);
      refetch();
      setShowAddModal(false);
      toast.success("Rol creado exitosamente");
    } catch (error: any) {
      toast.error(error.response?.data?.detail?.message || "Error al crear rol");
    }
  };

  const handleUpdateRole = async (values: RoleFormValues) => {
    if (!selectedRole()) return;
    try {
      const payload: RoleUpdate = {
        name: values.name.trim(),
        description: values.description?.trim() || undefined,
        permissions: values.permissions || [],
      };
      await RolesApi.updateRole(selectedRole()!.id, payload);
      refetch();
      setShowEditModal(false);
      toast.success("Rol actualizado correctamente");
    } catch (error: any) {
      toast.error(error.response?.data?.detail?.message || "Error al actualizar rol");
    }
  };

  const handleDeleteRole = async (role: RoleResponse) => {
    if (
      !confirm(
        `¿Eliminar el rol "${role.name}"? Los usuarios que lo tengan quedarán sin rol asignado.`,
      )
    )
      return;
    try {
      await RolesApi.deleteRole(role.id);
      refetch();
      toast.success("Rol eliminado exitosamente");
    } catch (error: any) {
      toast.error(error.response?.data?.detail?.message || "Error al eliminar rol");
    }
  };

  return (
    <Show
      when={hasPermission(11)}
      fallback={
        <div class="alert alert-error shadow-sm text-white">
          No tienes permisos para ver esta sección.
        </div>
      }
    >
      <Toaster position="top-right" gutter={8} />
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg">Roles y permisos</h3>
          <Show when={hasPermission(12)}>
            <button
              type="button"
              class="btn btn-primary btn-sm text-white gap-1"
              onClick={() => {
                reset(addFormStore);
                setShowAddModal(true);
              }}
            >
              <AiOutlinePlus size={16} /> Crear rol
            </button>
          </Show>
        </div>

        <div class="overflow-x-auto">
          <table class="table table-sm w-full">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Permisos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <Show when={roles.loading}>
                <tr>
                  <td colspan="4" class="text-center">
                    Cargando...
                  </td>
                </tr>
              </Show>
              <For each={roles()}>
                {(role) => (
                  <tr>
                    <td class="font-bold">{role.name}</td>
                    <td>{role.description || "-"}</td>
                    <td>{role.permissions.length}</td>
                    <td class="flex gap-1">
                      <Show when={hasPermission(13)}>
                        <button
                          class="btn btn-square btn-xs btn-outline"
                          onClick={() => {
                            setSelectedRole(role);
                            reset(editFormStore, {
                              initialValues: {
                                name: role.name,
                                description: role.description || "",
                                permissions: role.permissions,
                              },
                            });
                            setShowEditModal(true);
                          }}
                          title="Editar"
                        >
                          <AiOutlineEdit size={14} />
                        </button>
                      </Show>
                      <Show when={hasPermission(14)}>
                        <button
                          class="btn btn-square btn-xs btn-error text-white"
                          onClick={() => handleDeleteRole(role)}
                          title="Eliminar"
                        >
                          <AiOutlineDelete size={14} />
                        </button>
                      </Show>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>

        <dialog
          class={`modal ${showAddModal() ? "modal-open" : ""}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false);
          }}
        >
          <div class="modal-box max-w-md">
            <h3 class="font-bold text-lg mb-2">Crear rol</h3>
            <AddForm onSubmit={handleAddRole}>
              <AddField name="name">
                {(field, props) => (
                  <Input label="Nombre del rol" value={field.value} error={field.error} {...props} />
                )}
              </AddField>
              <AddField name="description">
                {(field, props) => (
                  <Input label="Descripción" value={field.value} error={field.error} {...props} />
                )}
              </AddField>
              <div class="mt-2">
                <p class="label-text mb-1">Permisos</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-56 overflow-y-auto border border-base-300 rounded-lg p-2">
                  <For each={permissions()}>
                    {(permission) => (
                      <AddField name="permissions" type="number[]">
                        {(field) => (
                          <label class="label cursor-pointer gap-2 justify-start">
                            <input
                              type="checkbox"
                              class="checkbox checkbox-primary checkbox-sm"
                              checked={(field.value || []).includes(permission.id)}
                              onChange={(e) =>
                                togglePermission(
                                  addFormStore,
                                  field.value,
                                  permission.id,
                                  e.currentTarget.checked,
                                )
                              }
                            />
                            <span class="label-text text-xs">{permission.description}</span>
                          </label>
                        )}
                      </AddField>
                    )}
                  </For>
                </div>
              </div>
              <div class="modal-action">
                <button type="submit" class="btn btn-primary btn-sm text-white">
                  Crear
                </button>
                <button type="button" class="btn btn-sm" onClick={() => setShowAddModal(false)}>
                  Cancelar
                </button>
              </div>
            </AddForm>
          </div>
        </dialog>

        <dialog
          class={`modal ${showEditModal() ? "modal-open" : ""}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowEditModal(false);
          }}
        >
          <div class="modal-box max-w-md">
            <h3 class="font-bold text-lg mb-2">Editar rol</h3>
            <Show when={selectedRole()}>
              <EditForm onSubmit={handleUpdateRole}>
                <EditField name="name">
                  {(field, props) => (
                    <Input label="Nombre del rol" value={field.value} error={field.error} {...props} />
                  )}
                </EditField>
                <EditField name="description">
                  {(field, props) => (
                    <Input label="Descripción" value={field.value} error={field.error} {...props} />
                  )}
                </EditField>
                <div class="mt-2">
                  <p class="label-text mb-1">Permisos</p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-56 overflow-y-auto border border-base-300 rounded-lg p-2">
                    <For each={permissions()}>
                      {(permission) => (
                        <EditField name="permissions" type="number[]">
                          {(field) => (
                            <label class="label cursor-pointer gap-2 justify-start">
                              <input
                                type="checkbox"
                                class="checkbox checkbox-primary checkbox-sm"
                                checked={(field.value || []).includes(permission.id)}
                                onChange={(e) =>
                                  togglePermission(
                                    editFormStore,
                                    field.value,
                                    permission.id,
                                    e.currentTarget.checked,
                                  )
                                }
                              />
                              <span class="label-text text-xs">{permission.description}</span>
                            </label>
                          )}
                        </EditField>
                      )}
                    </For>
                  </div>
                </div>
                <div class="modal-action">
                  <button type="submit" class="btn btn-primary btn-sm text-white">
                    Actualizar
                  </button>
                  <button type="button" class="btn btn-sm" onClick={() => setShowEditModal(false)}>
                    Cancelar
                  </button>
                </div>
              </EditForm>
            </Show>
          </div>
        </dialog>
      </div>
    </Show>
  );
};
