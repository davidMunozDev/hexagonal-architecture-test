import { SavedCityRepository } from '../domain/SavedCityRepository';
import { SavedCity } from '../domain/SavedCity';

export const getAllSavedCities = (
	repository: SavedCityRepository,
): (() => Promise<SavedCity[]>) => {
	return () => {
		return repository.get();
	};
};
