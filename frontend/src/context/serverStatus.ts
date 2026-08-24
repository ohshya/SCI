import { createSignal } from "solid-js";
import { api } from "@/api/axios";

const [online, setOnline] = createSignal<boolean>(true);

let intervalId: ReturnType<typeof setInterval> | undefined;

export function markOnline() {
	setOnline(true);
}

export function markOffline() {
	setOnline(false);
}

export async function checkServerStatus() {
	try {
		await api.get("health");
		setOnline(true);
	} catch {
		setOnline(false);
	}
}

export function startServerStatusPolling(intervalMs = 15000) {
	if (intervalId) return;
	checkServerStatus();
	intervalId = setInterval(checkServerStatus, intervalMs);
}

export function stopServerStatusPolling() {
	if (intervalId) clearInterval(intervalId);
	intervalId = undefined;
}

export function useServerStatus() {
	return {
		online: () => online(),
	};
}

export const get_health = async () => {
	await checkServerStatus();
	return online();
};
