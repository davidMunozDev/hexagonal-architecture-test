export const httpClient = {
	get: async (
		url: string,
		params?: Record<string, string | unknown>, // Update the type of params to Record<string, string>
		options?: Record<string, unknown>,
	): Promise<any> => {
		const searchParams = new URLSearchParams(params as Record<string, string>);
		return await fetch(`${url}?${searchParams}`, options)
			.then(response => response.json())
			.catch(error => {
				console.error(error.message);
			});
	},
};
