import axios from "axios";
import { markOnline, markOffline } from "@/context/serverStatus";

export const api = axios.create({
	baseURL: "http://127.0.0.1:8000/api/",
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => {
		markOnline();
		return response;
	},
	(error) => {
		if (!error.response) {
			markOffline();
		} else {
			markOnline();
		}
		return Promise.reject(error);
	}
);
