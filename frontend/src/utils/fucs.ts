export const formatDate = (dateString: string) => {
	if (!dateString) return "Fecha no disponible";
	try {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) return "Fecha inválida";
		return date.toLocaleString("es-ES", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
	} catch {
		return "Fecha inválida";
	}
};
