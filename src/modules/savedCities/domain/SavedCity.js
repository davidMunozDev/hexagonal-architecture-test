export const createSavedCity = city => {
	return {
		name: city.name,
		country: city.country,
		coordinates: city.coordinates,
		id: getSavedCityId(city),
	};
};

export const getSavedCityId = city => {
	return city.coordinates.join('');
};

export const addSavedCity = (savedCities, newCity) => {
	return [...new Set([...savedCities, newCity])];
};

export const isSavedCity = (savedCities, city) => {
	return savedCities.some(savedCity => savedCity.id === getSavedCityId(city));
};

export const removeSavedCity = (savedCities, id) => {
	return savedCities.filter(city => city.id !== id);
};
