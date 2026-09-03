import { api } from "./axios";

export type PermissionResponse = {
	id: number;
	name: string;
	description: string;
};

export type RoleResponse = {
	id: number;
	name: string;
	description: string | null;
	permissions: number[];
	created_at: string;
};

export type RoleCreate = {
	name: string;
	description?: string;
	permissions: number[];
};

export type RoleUpdate = {
	name?: string;
	description?: string;
	permissions?: number[];
};

export const RolesApi = {
	getRoles: async () => {
		const response = await api.get("/roles/");
		return response.data as RoleResponse[];
	},
	getPermissions: async () => {
		const response = await api.get("/roles/permissions");
		return response.data as PermissionResponse[];
	},
	createRole: async (roleData: RoleCreate) => {
		const response = await api.post("/roles/", roleData);
		return response.data as RoleResponse;
	},
	updateRole: async (roleId: number, roleData: RoleUpdate) => {
		const response = await api.patch(`/roles/${roleId}`, roleData);
		return response.data as RoleResponse;
	},
	deleteRole: async (roleId: number) => {
		const response = await api.delete(`/roles/${roleId}`);
		return response.data;
	},
};
