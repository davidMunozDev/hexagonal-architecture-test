import {
	addSavedCity,
	removeSavedCity,
} from '@/modules/savedCities/domain/SavedCity';

const localStorageKey = 'savedCities';

export const createLocalStorageSavedCitiesRepository = () => ({
	get: async function () {
		const savedCities = localStorage.getItem(localStorageKey);
		return savedCities ? JSON.parse(savedCities) : [];
	},
	save: async function (cityToSave) {
		this.get().then(savedCities => {
			localStorage.setItem(
				localStorageKey,
				JSON.stringify(addSavedCity(savedCities, cityToSave)),
			);
		});
	},
	delete: async function (savedCityToRemove) {
		this.get().then(savedCities => {
			const newSavedCities = removeSavedCity(savedCities, savedCityToRemove);
			localStorage.setItem(localStorageKey, JSON.stringify(newSavedCities));
		});
	},
	deleteAll: async function () {
		localStorage.setItem(localStorageKey, JSON.stringify([]));
	},
});
