import { createResource, For, Show, createSignal, createEffect, on, onCleanup } from 'solid-js'
import { LogsApi } from '@/api/logs.api'
import { useAuth } from '@/context/auth'
import { formatDate } from '@/utils/fucs'

export function LogsViewer() {
  const { hasPermission } = useAuth()
  const [page, setPage] = createSignal(1)
  const [logs] = createResource(
    () => ({ page: page(), size: 10 }),
    LogsApi.getLogs
  )

  const [showLoading, setShowLoading] = createSignal(false)
  let loadingTimer: ReturnType<typeof setTimeout> | undefined
  createEffect(on(() => logs.loading, (isLoading) => {
    clearTimeout(loadingTimer)
    if (isLoading) {
      loadingTimer = setTimeout(() => setShowLoading(true), 250)
    } else {
      setShowLoading(false)
    }
  }))
  onCleanup(() => clearTimeout(loadingTimer))

  return (
    <Show
      when={hasPermission(8)}
      fallback={<div class='alert alert-warning'>No tienes permisos para ver los logs.</div>}
    >
      <div class='overflow-x-auto w-full'>
        <table class='table table-sm table-zebra w-full'>
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
            <Show when={showLoading()}>
              <tr>
                <td colspan='5' class='text-center'>
                  Cargando logs...
                </td>
              </tr>
            </Show>
            <For each={logs.latest?.items}>
              {log => (
                <tr>
                  <td>{log.id}</td>
                  <td>
                    <span class='badge badge-ghost badge-sm'>{log.type}</span>
                  </td>
                  <td class='whitespace-normal wrap-break-word max-w-xs'>
                    {log.message}
                  </td>
                  <td class='font-mono text-xs'>{log.ip}</td>
                  <td>{formatDate(log.created_at)}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
        <div class='join w-full justify-center mt-4'>
          <button
            class='join-item btn btn-sm'
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page() === 1}
          >
            «
          </button>
          <button class='join-item btn btn-sm no-animation'>
            Página {page()} de {logs.latest?.pages || 1}
          </button>
          <button
            class='join-item btn btn-sm'
            onClick={() => setPage(p => p + 1)}
            disabled={page() === (logs.latest?.pages || 1)}
          >
            »
          </button>
        </div>
      </div>
    </Show>
  )
}
