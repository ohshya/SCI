import { api } from "./axios";

export type LogResponse = {
	id: number;
	userId: number | null;
	logType: string;
	message: string;
	ipAddress: string;
	date: string;
};

export type PaginatedLogs = {
	items: LogResponse[];
	total: number;
	page: number;
	size: number;
	pages: number;
};

export const LogsApi = {
	getLogs: async (params?: {
		page?: number;
		size?: number;
		log_type?: string;
		user_id?: number;
	}) => {
		const response = await api.get("audit/logs/", { params });
		return response.data as PaginatedLogs;
	},
};
