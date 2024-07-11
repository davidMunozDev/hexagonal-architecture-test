import { httpClient } from '@/modules/shared/infrastructure/HttpClient';

export const createApiCitiesRepository = () => ({
	getAll: async function (city) {
		const cities = await httpClient.get(
			'https://geocoding-api.open-meteo.com/v1/search',
			{
				name: city,
				count: 10,
				language: 'en',
				format: 'json',
			},
		);
		return Array.isArray(cities?.results) && mapCities(cities.results);
	},
});

const mapCities = cities =>
	cities.map(city => ({
		coordinates:
			city?.latitude || city?.longitude ? [city.latitude, city.longitude] : [],
		name: city?.name || '',
		country: city?.country || '',
		id: city?.id || '',
	}));
