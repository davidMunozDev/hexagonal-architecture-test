import { createSavedCity } from '@/modules/savedCities/domain/SavedCity';

export const addSavedCityUseCase = repository => {
	return city => {
		return repository.save(createSavedCity(city));
	};
};
