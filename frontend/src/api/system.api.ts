import { api } from "./axios";

export const SystemApi = {
	testError: async (statusCode: number, toast: boolean = false) => {
		const response = await api.get(`/system/test-error/${statusCode}`, {
			params: { toast },
		});
		return response.data;
	},
};
