import { City, Coordinates } from '@/modules/cities/domain/City';

export interface SavedCity {
	name: string;
	country: string;
	coordinates: Coordinates;
	id: string;
}

export const createSavedCity = (city: City): SavedCity => {
	return {
		name: city.name,
		coordinates: city?.coordinates,
		country: city.country,
		id: getSavedCityId(city),
	};
};

export const getSavedCityId = (city: City): string => {
	return city.coordinates.join('');
};

export const addSavedCity = (
	savedCities: SavedCity[],
	newCity: City,
): SavedCity[] => {
	const newSavedCity = createSavedCity(newCity);
	return savedCities.find(({ id }) => id === newSavedCity.id)
		? savedCities
		: [...savedCities, newSavedCity];
};

export const isSavedCity = (savedCities: SavedCity[], city: City): boolean => {
	return savedCities.some(savedCity => savedCity.id === getSavedCityId(city));
};

export const removeSavedCity = (
	savedCities: SavedCity[],
	id: string,
): SavedCity[] => {
	return savedCities.filter(city => city.id !== id);
};
