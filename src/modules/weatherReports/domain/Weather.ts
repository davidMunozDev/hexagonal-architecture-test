export enum WeatherConditions {
	clear,
	mainlyClear,
	partlyCloudy,
	overcast,
	rain,
	fog,
	snow,
	unknown,
}

export interface DailyWeather {
	day: string;
	maxTemperature: number;
	minTemperature: number;
	weather: WeatherConditions;
}

export interface Weather {
	temperature: number;
	maxTemperature: number;
	minTemperature: number;
	is_day: boolean;
	weather: WeatherConditions;
	sunrise: string;
	sunset: string;
	daily: DailyWeather[];
}
