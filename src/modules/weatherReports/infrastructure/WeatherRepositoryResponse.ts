export interface Current_weather_unit {
	time: string;
	interval: string;
	temperature: string;
	windspeed: string;
	winddirection: string;
	is_day: string;
	weathercode: string;
}

export interface Hourly_unit {
	time: string;
	weathercode: string;
	temperature_2m: string;
}

export interface Hourly {
	time: string[];
	weathercode: number[];
	temperature_2m: number[];
}

export interface Daily_unit {
	time: string;
	weathercode: string;
	temperature_2m_max: string;
	temperature_2m_min: string;
	sunrise: string;
	sunset: string;
}

export interface CurrentWeatherResponse {
	time: string;
	interval: number;
	temperature: number;
	windspeed: number;
	winddirection: number;
	is_day: number;
	weathercode: number;
}

export interface DailyResponse {
	time: string[];
	weathercode: number[];
	temperature_2m_max: number[];
	temperature_2m_min: number[];
	sunrise: string[];
	sunset: string[];
}

export interface WeatherApiResponse {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_weather_units: Current_weather_unit;
	current_weather: CurrentWeatherResponse;
	hourly_units: Hourly_unit;
	hourly: Hourly;
	daily_units: Daily_unit;
	daily: DailyResponse;
}
