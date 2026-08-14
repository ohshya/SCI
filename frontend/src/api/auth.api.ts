import { api } from "./axios";

export async function fetchMe() {
	const response = await api.get("/auth/me");
	return response.data;
}

export async function loginRequest(username: string, password: string) {
	const response = await api.post("/auth/login", { username, password });
	return response.data;
}

export async function logoutRequest() {
	const response = await api.post("/auth/logout");
	return response.data;
}

export async function getSessions() {
	const response = await api.get("/auth/sessions");
	return response.data;
}

export async function deleteSession(sessionId: string) {
	const response = await api.delete(`/auth/sessions/${sessionId}`);
	return response.data;
}

export async function deleteOtherAllSessions() {
	const response = await api.post("/auth/sessions/all");
	return response.data;
}
