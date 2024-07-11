export const getAllSavedCities = repository => {
	return () => {
		return repository.get();
	};
};
