export const deleteSavedCityUseCase = repository => {
	return id => {
		return repository.delete(id);
	};
};

export const deleteAllSavedCitiesUseCase = repository => {
	return () => {
		return repository.deleteAll();
	};
};
