import { WeatherRepository } from '@/modules/weatherReports/domain/WeatherRepository';
import { Weather } from '@/modules/weatherReports/domain/Weather';
import { Coordinates } from '@/modules/cities/domain/City';

export const getWeatherByParamCoordinates = (
	weatherRepository: WeatherRepository,
): ((coordinates: Coordinates) => Promise<Weather>) => {
	return coordinates => {
		return weatherRepository.get(coordinates);
	};
};
