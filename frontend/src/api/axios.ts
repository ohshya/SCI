import axios from "axios";

export const api = axios.create({
	baseURL: "http://127.0.0.1:8000/api/",
	withCredentials: true,
});

export const get_health = async () => {
	try {
		const r = await api.get("health");
		return r.data;
	} catch (error) {
		alert(error);
	}
};
