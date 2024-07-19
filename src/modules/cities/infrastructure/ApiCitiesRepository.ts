import { httpClient } from '@/modules/shared/infrastructure/HttpClient';
import { CityResponse } from './ApiCitiesRepositoryResponse';
import { CityRepository } from '@/modules/cities/domain/CityRepository';
import { City } from '@/modules/cities/domain/City';

export const createApiCitiesRepository = (): CityRepository => ({
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
		return Array.isArray(cities?.results) ? mapCities(cities.results) : [];
	},
});

const mapCities = (cities: CityResponse[]): City[] =>
	cities.map(city => ({
		coordinates:
			city?.latitude && city?.longitude
				? [city.latitude, city.longitude]
				: null,
		name: city?.name || '',
		country: city?.country || '',
	}));
