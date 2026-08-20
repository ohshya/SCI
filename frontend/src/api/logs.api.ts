import { api } from "./axios";

export type LogResponse = {
  id: number;
  user_id: number | null;
  type: string;
  message: string;
  ip: string;
  created_at: string;
  error_code: number | null;
  hash: string;
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
