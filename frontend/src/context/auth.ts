import { fetchMe, logoutRequest } from "@/api/auth.api";
import { createSignal } from "solid-js";

type User = {
	id: number;
	username: string;
	is_active: boolean;
	is_admin: boolean;
};

const [user, setUser] = createSignal<User | null>(null);
const [loading, setLoading] = createSignal<boolean>(true);

export async function refreshUser() {
	setLoading(true);
	try {
		const r = await fetchMe();
		setUser(r);
	} catch (e) {
		setUser(null);
	} finally {
		setLoading(false);
	}
}

let pendingLogout = false;

export async function logoutUser() {
	try {
		await logoutRequest();
		pendingLogout = false;
	} catch {
		pendingLogout = true;
	} finally {
		setUser(null);
	}
}

export async function retryPendingLogout() {
	if (!pendingLogout) return;
	try {
		await logoutRequest();
		pendingLogout = false;
  } catch {

	}
}

if (typeof window !== "undefined") {
	refreshUser();
}

export function useAuth() {
	return {
		user: () => user(),
		setUser: (u: User | null) => setUser(u),
		loading: () => loading(),
		refreshUser,
		logoutUser,
	};
}
