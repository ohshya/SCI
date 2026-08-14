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
                      {log.logType}
                    </span>
                  </td>
                  <td class="whitespace-normal wrap-break-word max-w-xs">
                    {log.message}
                  </td>
                  <td class="font-mono text-xs">{log.ipAddress}</td>
                  <td>{new Date(log.date).toLocaleString()}</td>
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
      {logs()&& <pre>{JSON.stringify(logs(), null, 2)}</pre>}
    </Show>
  );
}
