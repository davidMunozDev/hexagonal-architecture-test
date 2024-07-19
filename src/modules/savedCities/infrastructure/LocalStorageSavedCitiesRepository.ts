import {
	addSavedCity,
	removeSavedCity,
	SavedCity,
} from '@/modules/savedCities/domain/SavedCity';
import { City } from '@/modules/cities/domain/City';
import { SavedCityRepository } from '@/modules/savedCities/domain/SavedCityRepository';

const localStorageKey = 'savedCities';

export const createLocalStorageSavedCitiesRepository =
	(): SavedCityRepository => ({
		get: async function () {
			const savedCities = localStorage.getItem(localStorageKey);
			return savedCities ? JSON.parse(savedCities) : [];
		},
		save: async function (cityToSave: City) {
			this.get().then((savedCities: SavedCity[]) => {
				localStorage.setItem(
					localStorageKey,
					JSON.stringify(addSavedCity(savedCities, cityToSave)),
				);
			});
		},
		delete: async function (savedCityId: string) {
			this.get().then((savedCities: SavedCity[]) => {
				const newSavedCities = removeSavedCity(savedCities, savedCityId);
				localStorage.setItem(localStorageKey, JSON.stringify(newSavedCities));
			});
		},
		deleteAll: async function () {
			localStorage.setItem(localStorageKey, JSON.stringify([]));
		},
	});
