import { SavedCityRepository } from '../domain/SavedCityRepository';

export const deleteSavedCityUseCase = (repository: SavedCityRepository) => {
	return (id: string) => {
		return repository.delete(id);
	};
};

export const deleteAllSavedCitiesUseCase = (
	repository: SavedCityRepository,
) => {
	return () => {
		return repository.deleteAll();
	};
};
