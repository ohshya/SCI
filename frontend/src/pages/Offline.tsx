import { FiWifiOff } from "solid-icons/fi";
import { checkServerStatus } from "@/context/serverStatus";
import { createSignal } from "solid-js";

export default function Offline() {
	const [retrying, setRetrying] = createSignal(false);

	const handleRetry = async () => {
		setRetrying(true);
		await checkServerStatus();
		setRetrying(false);
	};

	return (
		<div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
			<div class="max-w-xs w-full text-center">
				<FiWifiOff size={56} class="mx-auto text-error mb-4" />
				<h2 class="text-2xl font-bold text-base-content mb-3">
					Sin conexión
				</h2>
				<p class="text-base-content/70 text-sm mb-8">
					No se pudo conectar con el servidor. Verifica tu conexión
					o intenta de nuevo en unos segundos.
				</p>
				<button
					onClick={handleRetry}
					class="btn btn-primary w-full sm:w-auto sm:px-8"
					disabled={retrying()}
				>
					{retrying() ? "Reintentando..." : "Reintentar"}
				</button>
			</div>
		</div>
	);
}
