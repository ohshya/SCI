import { useAuth } from "@/context/auth";
import { UsersList } from "@/features/users/UsersList";
import { RolesList } from "@/features/roles/RolesList";
import { SessionsList } from "@/features/sessions/SessionsList";
import { LogsViewer } from "@/features/logs/LogsViewer";
import { SystemTester } from "@/features/system/SystemTester";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { UserProfile } from "@/features/auth/UserProfile";
import { AiOutlineLogout } from "solid-icons/ai";
import { createSignal, Match, Show, Switch } from "solid-js";

export default function Dashboard() {
  const { user, logoutUser, hasPermission, hasAnyPermission } = useAuth();

  const [activeTab, setActiveTab] = createSignal(1);

  return (
    <div class="min-h-screen bg-base-200">
      <div class="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4">
        <div class="flex-1">
          <p class=" flex items-center gap-2 text-xl font-bold">
            <StatusBadge />
            API Test Panel
          </p>
        </div>

        <div class="flex items-center gap-2">
          <div class="hidden sm:block text-sm text-right mr-2">
            <p class="font-bold">{user()?.username}</p>
          </div>
          <button
            onClick={logoutUser}
            class="btn btn-sm btn-square btn-ghost text-error"
          >
            <AiOutlineLogout size={24} />
          </button>
        </div>
      </div>
      <main class="container mx-auto p-4 lg:p-8 space-y-8 max-w-7xl">
        <div role="tablist" class="tabs tabs-border">
          <a role="tab" class="tab" classList={{ "tab-active": activeTab() === 1 }} onclick={() => setActiveTab(1)}>
            Sesión
          </a>
          <a role="tab" class="tab" classList={{ "tab-active": activeTab() === 2 }} onclick={() => setActiveTab(2)}>
            Errores
          </a>
          <Show when={hasAnyPermission([1, 2, 3, 4, 5, 6, 7])}>
            <a role="tab" class="tab" classList={{ "tab-active": activeTab() === 3 }} onclick={() => setActiveTab(3)}>
              Usuarios
            </a>
          </Show>
          <Show when={hasPermission(8)}>
            <a role="tab" class="tab" classList={{ "tab-active": activeTab() === 4 }} onclick={() => setActiveTab(4)}>
              Logs
            </a>
          </Show>
          <Show when={hasPermission(11)}>
            <a role="tab" class="tab" classList={{ "tab-active": activeTab() === 5 }} onclick={() => setActiveTab(5)}>
              Roles
            </a>
          </Show>
        </div>

        <Switch>
          <Match when={activeTab() === 1}>
            <UserProfile />
          </Match>
          <Match when={activeTab() === 2}>
            <SystemTester />
          </Match>
          <Match when={activeTab() === 3 && hasAnyPermission([1, 2, 3, 4, 5, 6, 7])}>
            <UsersList />
            <SessionsList />
          </Match>
          <Match when={activeTab() === 4 && hasPermission(8)}>
            <LogsViewer />
          </Match>
          <Match when={activeTab() === 5 && hasPermission(11)}>
            <RolesList />
          </Match>
        </Switch>
      </main>
    </div>
  );
}
