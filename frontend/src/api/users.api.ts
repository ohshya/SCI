import { api } from "./axios";

export type UserResponse = {
	id: number;
	username: string;
	is_active: boolean;
	is_admin: boolean;
	created_at: string;
};

export type UserCreate = {
	username: string;
	password: string;
	is_admin?: boolean;
};

export type UserUpdate = {
	username?: string;
	is_active?: boolean;
	is_admin?: boolean;
};

export const UsersApi = {
	getUsers: async (params?: {
		is_active?: boolean;
		is_admin?: boolean;
		search?: string;
	}) => {
		const response = await api.get("/users/", { params });
		return response.data as UserResponse[];
	},
	createUser: async (userData: UserCreate) => {
		const response = await api.post("/users/", userData);
		return response.data;
	},
	updateUser: async (userId: number, userData: UserUpdate) => {
		const response = await api.patch(`/users/${userId}`, userData);
		return response.data;
	},
	disableUser: async (userId: number) => {
		const response = await api.patch(`/users/disable/${userId}`);
		return response.data;
	},
	deleteUser: async (userId: number) => {
		const response = await api.delete(`/users/${userId}`);
		return response.data;
	},
	changeUserPassword: async (userId: number, newPassword: string) => {
		const response = await api.post(`/users/${userId}/password`, {
			new_password: newPassword,
		});
		return response.data;
	},
	closeAllSessionsOfUser: async (userId: number) => {
		const response = await api.delete(`/auth/sessions/all/${userId}`);
		return response.data;
	},
};
