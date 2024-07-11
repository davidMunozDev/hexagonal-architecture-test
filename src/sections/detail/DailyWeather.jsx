import styled from 'styled-components';

import WeatherStatusIcon from '@/sections/shared/WeatherStatusIcon';
import Text from '@/sections/shared/Text';
import translations from '@/translations';

const StyledContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
`;

const StyledWeatherIcon = styled(WeatherStatusIcon)`
	width: 24px;
	height: auto;
`;

const StyledDay = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px;
	background-color: white;
	border-radius: 4px;
	width: 100%;
	max-width: 380px;
`;

const StyledLabel = styled.span`
	width: 100px;
	text-align: ${({ align }) => align};
`;

function DailyWeather({ weather }) {
	if (!weather) {
		return null;
	}
	return (
		<StyledContainer data-test='daily-weather'>
			<header>
				<Text weight='bold'>{translations.detail.daily_title}</Text>
			</header>
			{weather.daily.map(day => (
				<StyledDay key={day.day}>
					<StyledLabel align='left'>{day.day}</StyledLabel>
					<StyledWeatherIcon weather={day.weather} />
					<StyledLabel align='right'>
						{day.maxTemperature}° - {day.minTemperature}°
					</StyledLabel>
				</StyledDay>
			))}
		</StyledContainer>
	);
}

export default DailyWeather;
