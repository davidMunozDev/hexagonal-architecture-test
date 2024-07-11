import {
	IconWeatherUnknown,
	IconWeatherSnow,
	IconWeatherRain,
	IconWeatherFog,
	IconWeatherOvercast,
	IconWeatherClear,
	IconWeatherMainlyClear,
	IconWeatherPartlyCloudy,
} from '@/sections/shared/Icons';
import { WEATHER_CONDITIONS } from '@/modules/weatherReports/domain/Weather';

const renderIcon = ({ weather, className }) => {
	const weatherIcons = {
		[WEATHER_CONDITIONS.clear]: <IconWeatherClear className={className} />,
		[WEATHER_CONDITIONS.mainlyClear]: (
			<IconWeatherMainlyClear className={className} />
		),
		[WEATHER_CONDITIONS.partlyCloudy]: (
			<IconWeatherPartlyCloudy className={className} />
		),
		[WEATHER_CONDITIONS.overcast]: (
			<IconWeatherOvercast className={className} />
		),
		[WEATHER_CONDITIONS.rain]: <IconWeatherRain className={className} />,
		[WEATHER_CONDITIONS.fog]: <IconWeatherFog className={className} />,
		[WEATHER_CONDITIONS.snow]: <IconWeatherSnow className={className} />,
		[WEATHER_CONDITIONS.unknown]: <IconWeatherUnknown className={className} />,
	};
	return weatherIcons[weather];
};

function WeatherStatusIcon(props) {
	return renderIcon(props);
}

export default WeatherStatusIcon;
