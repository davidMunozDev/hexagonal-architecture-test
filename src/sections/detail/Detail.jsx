import { useParams } from 'react-router-dom';
import useQuery from '@/hooks/useQuery';
import styled from 'styled-components';

import {
	useWeatherWidget,
	WEATHER_WIDGET_STATUS,
} from '@/sections/detail/useWeatherWidget';
import { transformCoordinatesFromUrlParam } from '@/modules/cities/domain/City';
import { useSavedCitiesContext } from '@/sections/SavedCitiesContextProvider';
import { isSavedCity as validateIsSavedCity } from '@/modules/savedCities/domain/SavedCity';
import translations from '@/translations';
import CurrentDayWeather from '@/sections/detail/CurrentDayWeather';
import DailyWeather from '@/sections/detail/DailyWeather';
import Button from '@/sections/shared/Button';

const StyledSaveCityAction = styled(Button)`
	position: absolute;
	right: 0;
	top: 5%;
`;

const StyledContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 32px;
`;

function Detail({ weatherRepository }) {
	const query = useQuery();
	const { name, country } = useParams();
	const coordinates = query.get('coordinates');
	const city = {
		name,
		country,
		coordinates: transformCoordinatesFromUrlParam(coordinates),
	};
	const { weather, status } = useWeatherWidget({
		repository: weatherRepository,
		city,
	});
	const { savedCities, addSavedCity, deleteSavedCity } =
		useSavedCitiesContext();
	const isSavedCity = validateIsSavedCity(savedCities, city);

	const handleSaveCityAction = () => {
		if (isSavedCity) {
			deleteSavedCity(city);
			return;
		}
		addSavedCity(city);
	};

	if (WEATHER_WIDGET_STATUS.error === status) {
		return <div>{translations.detail.error}</div>;
	}

	if (!weather && WEATHER_WIDGET_STATUS.loading === status) {
		return <div>{translations.detail.loading}</div>;
	}

	return (
		<StyledContainer>
			<StyledSaveCityAction onClick={handleSaveCityAction}>
				{translations.detail[isSavedCity ? 'delete_button' : 'add_button']}
			</StyledSaveCityAction>
			<CurrentDayWeather weather={weather} />
			<DailyWeather weather={weather} />
		</StyledContainer>
	);
}

export default Detail;
