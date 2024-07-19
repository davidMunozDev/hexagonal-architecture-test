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
import { WeatherConditions } from '@/modules/weatherReports/domain/Weather';

const renderIcon = ({
	weather,
	className,
}: {
	weather: WeatherConditions;
	className: string;
}) => {
	const weatherIcons = {
		[WeatherConditions.clear]: <IconWeatherClear className={className} />,
		[WeatherConditions.mainlyClear]: (
			<IconWeatherMainlyClear className={className} />
		),
		[WeatherConditions.partlyCloudy]: (
			<IconWeatherPartlyCloudy className={className} />
		),
		[WeatherConditions.overcast]: <IconWeatherOvercast className={className} />,
		[WeatherConditions.rain]: <IconWeatherRain className={className} />,
		[WeatherConditions.fog]: <IconWeatherFog className={className} />,
		[WeatherConditions.snow]: <IconWeatherSnow className={className} />,
		[WeatherConditions.unknown]: <IconWeatherUnknown className={className} />,
	};
	return weatherIcons[weather];
};

interface WeatherStatusIconProps {
	weather: WeatherConditions;
	className: string;
}

function WeatherStatusIcon(props: WeatherStatusIconProps) {
	return renderIcon(props);
}

export default WeatherStatusIcon;
