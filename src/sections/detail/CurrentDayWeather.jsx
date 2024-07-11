import styled from 'styled-components';

import WeatherStatusIcon from '@/sections/shared/WeatherStatusIcon';
import Text from '@/sections/shared/Text';
import translations from '@/translations';

const StyledWeatherIcon = styled(WeatherStatusIcon)`
	width: 64px;
	height: auto;
`;

const StyledContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	width: 100%;
	padding-top: 60px;
`;

const StyledTemperature = styled(Text)`
	font-size: 3.2rem;
`;

function CurrentDayWeather({ weather }) {
	return (
		<StyledContainer data-test='current-weather'>
			<StyledWeatherIcon weather={translations.detail[weather.weather]} />
			<StyledTemperature element='h2' weight='bold'>
				{weather.temperature}°
			</StyledTemperature>
			<div>{weather.weather}</div>
			<Text weight='bold'>
				{translations.detail.max} {weather.maxTemperature}°{' '}
				{translations.detail.min} {weather.minTemperature}°
			</Text>
		</StyledContainer>
	);
}

export default CurrentDayWeather;
