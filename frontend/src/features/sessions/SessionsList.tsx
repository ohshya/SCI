import {
  getSessions,
  deleteSession,
  deleteOtherAllSessions,
} from "@/api/auth.api";
import { createResource, Show, For, createSignal } from "solid-js";
import { useAuth } from "@/context/auth";

export function SessionsList() {
  const { user } = useAuth();
  const [sessions, { refetch }] = createResource(getSessions);
  const [expandedId, setExpandedId] = createSignal<string | null>(null);
  const [closingIds, setClosingIds] = createSignal(new Set<string>());

  const handleCloseSession = async (id: string) => {
    setClosingIds((prev) => new Set(prev).add(id));
    try {
      await deleteSession(id);
      refetch();
    } catch (error) {
    } finally {
      setClosingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleCloseAll = async () => {
    try {
      await deleteOtherAllSessions();
      refetch();
    } catch (error) {}
  };

  const toggleDetails = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString();
  };

  const getDeviceName = (userAgent: string) => {
    if (!userAgent) return "Dispositivo desconocido";
    const browserMatch = userAgent.match(
      /(Chrome|Firefox|Safari|Edge)\/[\d.]+/,
    );
    const osMatch = userAgent.match(/\((.*?)\)/);
    const browser = browserMatch ? browserMatch[1] : "";
    const os = osMatch ? osMatch[1].split(";")[0] : "";
    return `${browser}${os ? ` en ${os}` : ""}`.trim() || userAgent;
  };

  return (
    <Show
      when={user()}
      fallback={
        <div class="alert alert-info shadow-sm">
          Inicia sesión para mostrar la lista
        </div>
      }
    >
      <div class="flex flex-col gap-4">
        <div class="flex justify-end">
          <button
            class="btn btn-error btn-sm text-white"
            onClick={handleCloseAll}
          >
            Cerrar otras sesiones
          </button>
        </div>
        <div class="max-h-[50vh] overflow-y-auto pr-1 space-y-3">
          <Show
            when={!sessions.loading}
            fallback={
              <div class="flex justify-center p-4">
                <span class="loading loading-spinner loading-md"></span>
              </div>
            }
          >
            <For
              each={sessions()}
              fallback={
                <div class="alert alert-ghost">No hay sesiones activas.</div>
              }
            >
              {(session) => (
                <div class="border border-base-300 rounded-box bg-base-50 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div class="flex justify-between items-start gap-2">
                    <div
                      class="flex-1 cursor-pointer"
                      onClick={() => toggleDetails(session.id)}
                    >
                      <div class="flex flex-col gap-1">
                        <span class="font-bold text-sm block truncate max-w-xs">
                          {getDeviceName(session.user_agent)}
                        </span>
                        <span class="text-xs text-base-content/70">
                          Última actividad: {formatDate(session.last_activity)}
                        </span>
                      </div>
                      <div class="text-xs font-mono text-base-content/50 mt-1">
                        {session.ip_address || "IP desconocida"}
                      </div>
                    </div>
                    <button
                      class="btn btn-ghost btn-sm btn-circle"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCloseSession(session.id);
                      }}
                      disabled={closingIds().has(session.id)}
                    >
                      <Show
                        when={closingIds().has(session.id)}
                        fallback={<span class="text-error font-bold">✕</span>}
                      >
                        <span class="loading loading-spinner loading-xs"></span>
                      </Show>
                    </button>
                  </div>
                  <Show when={expandedId() === session.id}>
                    <div class="mt-3 pt-3 border-t border-base-200 text-xs space-y-1 font-mono bg-base-100 p-2 rounded-md">
                      <p>
                        <span class="font-bold">ID:</span> {session.id}
                      </p>
                      <p>
                        <span class="font-bold">Ubicación:</span>{" "}
                        {session.location || "No disponible"}
                      </p>
                      <p>
                        <span class="font-bold">User Agent:</span>{" "}
                        {session.user_agent}
                      </p>
                      <p>
                        <span class="font-bold">Creada:</span>{" "}
                        {formatDate(session.created_at)}
                      </p>
                      <p>
                        <span class="font-bold">Expira:</span>{" "}
                        {formatDate(session.expires_at)}
                      </p>
                    </div>
                  </Show>
                </div>
              )}
            </For>
          </Show>
        </div>
      </div>
    </Show>
  );
}
