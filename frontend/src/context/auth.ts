import { fetchMe, fetchMyPermissions, logoutRequest } from "@/api/auth.api";
import { createSignal } from "solid-js";

type User = {
	id: number;
	username: string;
	is_active: boolean;
	is_admin: boolean;
};

const [user, setUser] = createSignal<User | null>(null);
const [permissions, setPermissions] = createSignal<number[]>([]);
const [loading, setLoading] = createSignal<boolean>(true);

export async function refreshUser() {
	setLoading(true);
	try {
		const r = await fetchMe();
		setUser(r);
		const perms = await fetchMyPermissions();
		setPermissions(perms);
	} catch (e) {
		setUser(null);
		setPermissions([]);
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
		setPermissions([]);
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
		permissions: () => permissions(),
		hasPermission: (id: number) => user()?.is_admin || permissions().includes(id),
		hasAnyPermission: (ids: number[]) =>
			user()?.is_admin || ids.some((id) => permissions().includes(id)),
		loading: () => loading(),
		refreshUser,
		logoutUser,
	};
}
