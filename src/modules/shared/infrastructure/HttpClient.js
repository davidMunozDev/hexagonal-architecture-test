export const httpClient = {
	get: async (url, params, options) => {
		return await fetch(`${url}?${new URLSearchParams(params)}`, options)
			.then(response => response.json())
			.catch(error => {
				console.error(error.message);
			});
	},
};
