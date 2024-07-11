export const getWeatherByParamCoordinates = weatherRepository => {
	return coordinates => {
		return weatherRepository.get(coordinates);
	};
};
