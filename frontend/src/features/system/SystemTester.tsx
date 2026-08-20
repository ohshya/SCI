import { createSignal } from "solid-js";
import { SystemApi } from "@/api/system.api";

export const SystemTester = () => {
  const [code, setCode] = createSignal(500);
  const [toast, setToast] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const testError = async () => {
    setLoading(true);
    try {
      await SystemApi.testError(code(), toast());
      alert("La petición fue exitosa (No se generó error)");
    } catch (error: any) {

      const status = error.response?.status || 'desconocido';
      const errorType = error.response?.data?.error?.type || 'Tipo no especificado';
      const errorMessage = error.response?.data?.error?.message || error.message;

      alert(
        `❌ Error ${status}\n` +
        `Tipo: ${errorType}\n` +
        `Mensaje: ${errorMessage}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="card bg-base-100 shadow-sm border border-base-300">
      <div class="card-body p-4">
        <h3 class="card-title text-lg">Probar Manejo de Errores</h3>
        <div class="flex flex-col sm:flex-row gap-2 mt-2 items-end">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Código HTTP</span>
            </div>
            <input
              type="number"
              class="input input-bordered input-sm w-full"
              value={code()}
              onInput={(e) => setCode(Number(e.currentTarget.value))}
            />
          </label>
          <label class="cursor-pointer label justify-start gap-2 mb-1">
            <input
              type="checkbox"
              class="checkbox checkbox-sm"
              checked={toast()}
              onChange={(e) => setToast(e.currentTarget.checked)}
            />
            <span class="label-text">Forzar Toast</span>
          </label>
          <button
            class="btn btn-warning btn-sm sm:ml-auto w-full sm:w-auto"
            onClick={testError}
            disabled={loading()}
          >
            {loading() ? "Enviando..." : "Lanzar Error"}
          </button>
        </div>
      </div>
    </div>
  );
};
