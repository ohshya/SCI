import { createResource, For, Show, createSignal } from "solid-js";
import { LogsApi } from "@/api/logs.api";
import { useAuth } from "@/context/auth";

export function LogsViewer() {
  const { user } = useAuth();
  const [page, setPage] = createSignal(1);
  const [logs] = createResource(
    () => ({ page: page(), size: 10 }),
    LogsApi.getLogs,
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha no disponible';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Fecha inválida';
      return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return 'Fecha inválida';
    }
  };

  return (
    <Show
      when={user()?.is_admin}
      fallback={<div class="alert alert-warning">Acceso denegado a Logs.</div>}
    >
      <div class="overflow-x-auto w-full">
        <table class="table table-sm table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Mensaje</th>
              <th>IP</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <Show when={logs.loading}>
              <tr>
                <td colspan="5" class="text-center">
                  Cargando logs...
                </td>
              </tr>
            </Show>
            <For each={logs()?.items}>
              {(log) => (
                <tr>
                  <td>{log.id}</td>
                  <td>
                    <span class="badge badge-ghost badge-sm">
                      {log.type}
                    </span>
                  </td>
                  <td class="whitespace-normal wrap-break-word max-w-xs">
                    {log.message}
                  </td>
                  <td class="font-mono text-xs">{log.ip}</td>
                  <td>{formatDate(log.created_at)}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
        <div class="join w-full justify-center mt-4">
          <button
            class="join-item btn btn-sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page() === 1}
          >
            «
          </button>
          <button class="join-item btn btn-sm no-animation">
            Página {page()} de {logs()?.pages || 1}
          </button>
          <button
            class="join-item btn btn-sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page() === (logs()?.pages || 1)}
          >
            »
          </button>
        </div>
      </div>

      {/* Debugging - Envuelto en un div para evitar texto suelto */}
      {logs() && (
        <div class="mt-4 p-4 bg-base-300 rounded-lg overflow-x-auto">
          <h4 class="font-bold mb-2">Debug Info:</h4>
          <pre class="text-xs">{JSON.stringify(logs(), null, 2)}</pre>
        </div>
      )}
    </Show>
  );
}
