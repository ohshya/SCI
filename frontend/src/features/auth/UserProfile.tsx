import { useAuth } from "@/context/auth";
import { Show } from "solid-js";
import { AiOutlineCheckCircle } from "solid-icons/ai";

export function UserProfile() {
  const { user } = useAuth();

  return (
    <Show when={user()}>
      <div class="card bg-base-100 shadow border border-base-300">
        <div class="card-body items-center text-center p-6">
          <AiOutlineCheckCircle class="text-success text-6xl mb-2" />
          <h3 class="card-title text-xl">Sesión Activa</h3>
          <div class="flex flex-col gap-1 w-full mt-4 bg-base-200 p-4 rounded-box text-sm">
            <div class="flex justify-between border-b border-base-300 pb-1">
              <span class="font-bold">ID:</span>
              <span>{user()?.id}</span>
            </div>
            <div class="flex justify-between border-b border-base-300 py-1">
              <span class="font-bold">Usuario:</span>
              <span>{user()?.username}</span>
            </div>
            <div class="flex justify-between border-b border-base-300 py-1">
              <span class="font-bold">Estado:</span>
              <span class="badge badge-success badge-sm">
                {user()?.is_active ? "Activo" : "Inactivo"}
              </span>
            </div>
            <div class="flex justify-between pt-1">
              <span class="font-bold">Rol:</span>
              <span class="badge badge-primary badge-sm">
                {user()?.is_admin ? "Admin" : "Usuario"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}
