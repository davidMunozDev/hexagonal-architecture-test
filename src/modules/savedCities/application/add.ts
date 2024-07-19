import { SavedCityRepository } from '../domain/SavedCityRepository';
import { City } from '@/modules/cities/domain/City';

export const addSavedCityUseCase = (repository: SavedCityRepository) => {
	return (city: City) => {
		return repository.save(city);
	};
};
