import { httpClient } from '@/modules/shared/infrastructure/HttpClient';
import {
	WeatherConditions,
	Weather,
	DailyWeather,
} from '@/modules/weatherReports/domain/Weather';
import { WeatherRepository } from '@/modules/weatherReports/domain/WeatherRepository';
import { Coordinates } from '@/modules/cities/domain/City';
import {
	getTimeFromDateStr,
	getDayFromDateStr,
} from '@/modules/shared/domain/Date';
import {
	DailyResponse,
	CurrentWeatherResponse,
} from './WeatherRepositoryResponse';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const createApiWeatherRepository = (): WeatherRepository => ({
	get: async function ([latitude, longitude]: Coordinates) {
		const weather = await httpClient.get(BASE_URL, {
			latitude,
			longitude,
			daily: 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset',
			hourly: 'weathercode,temperature_2m',
			timezone: 'auto',
			forecast_days: 7,
			current_weather: true,
		});
		return mapWeather(weather);
	},
});

const mapWeather = ({
	daily,
	current_weather,
}: {
	daily: DailyResponse;
	current_weather: CurrentWeatherResponse;
}): Weather => ({
	temperature: current_weather?.temperature || 0,
	maxTemperature: daily?.temperature_2m_max[0] || 0,
	minTemperature: daily?.temperature_2m_min[0] || 0,
	is_day: Boolean(current_weather?.is_day),
	weather: tranformWeatherCode(current_weather?.weathercode),
	sunrise: daily?.sunrise && getTimeFromDateStr(daily.sunrise[0]),
	sunset: daily?.sunset && getTimeFromDateStr(daily.sunset[0]),
	daily: Array.isArray(daily?.time) ? mapDailyWeather(daily) : [],
});

const mapDailyWeather = (daily: DailyResponse): DailyWeather[] => {
	return daily.time.map((time: string, index: number) => ({
		day: time ? getDayFromDateStr(time) : '',
		maxTemperature: daily?.temperature_2m_max[index] || 0,
		minTemperature: daily?.temperature_2m_min[index] || 0,
		weather: tranformWeatherCode(daily.weathercode[index]),
	}));
};

const tranformWeatherCode = (weatherCode: number) => {
	const WEATHER_EQUIVALENCES = [
		{ codes: [0], status: WeatherConditions.clear },
		{ codes: [1], status: WeatherConditions.mainlyClear },
		{ codes: [2], status: WeatherConditions.partlyCloudy },
		{ codes: [3], status: WeatherConditions.overcast },
		{ codes: [45, 48], status: WeatherConditions.fog },
		{
			codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99],
			status: WeatherConditions.rain,
		},
		{ codes: [71, 73, 75, 77, 85, 86], status: WeatherConditions.snow },
	];

	if (typeof weatherCode !== 'number') return WeatherConditions.unknown;

	return (
		WEATHER_EQUIVALENCES.find(({ codes }) => codes.includes(weatherCode))
			?.status || WeatherConditions.unknown
	);
};
