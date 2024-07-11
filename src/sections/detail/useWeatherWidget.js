import { useEffect, useState } from 'react';

import { getWeatherByParamCoordinates } from '@/modules/weatherReports/application/get';
import { isCityValid } from '@/modules/cities/domain/City';

export const WEATHER_WIDGET_STATUS = {
	loading: 'loading',
	loaded: 'loaded',
	error: 'error',
};

export function useWeatherWidget({ repository, city }) {
	const [weather, setWeather] = useState(null);
	const [status, setStatus] = useState(WEATHER_WIDGET_STATUS.loading);

	useEffect(() => {
		if (!isCityValid(city)) {
			setStatus(WEATHER_WIDGET_STATUS.error);
			return;
		}
		getWeather();
	}, []);

	const getWeather = async () => {
		const weather = await getWeatherByParamCoordinates(repository)(
			city.coordinates,
		);
		setWeather(weather);
		setStatus(WEATHER_WIDGET_STATUS.loaded);
	};

	return { weather, status };
}
