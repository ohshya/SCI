import { Show, onMount, onCleanup, createEffect, type JSX } from "solid-js";
import {
	useServerStatus,
	startServerStatusPolling,
	stopServerStatusPolling,
} from "@/context/serverStatus";
import { useAuth, retryPendingLogout } from "@/context/auth";
import Offline from "@/pages/Offline";

export function ServerStatusGate(props: { children: JSX.Element }) {
	const { online } = useServerStatus();
	const { user } = useAuth();

	createEffect(() => {
		if (online()) {
			retryPendingLogout();
		}
	});

	onMount(() => startServerStatusPolling());
	onCleanup(() => stopServerStatusPolling());

	return (
		<Show when={online() || user()} fallback={<Offline />}>
			<Show when={!online()}>
				<div class="fixed top-2 left-1/2 -translate-x-1/2 z-[100] bg-error text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
					Sin conexión
				</div>
			</Show>
			{props.children}
		</Show>
	);
}

// Hola
