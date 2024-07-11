import { useRef, useState } from 'react';
import styled from 'styled-components';

import {
	transformCoordinatesToUrlParam,
	isCityNameValid,
} from '@/modules/cities/domain/City';
import { useCitySelector } from '@/sections/dashboard/useCityselector';
import { getDetailPath } from '@/router/paths';
import InputText from '@/sections/shared/InputText';
import { useClickOutside } from '@/hooks/useClickOutside';
import LinksList from '@/sections/shared/LinksList';
import Notification from '@/sections/shared/Notification';
import translations from '@/translations';

const StyledCitySearchConatiner = styled.section`
	display: flex;
	justify-content: center;
	position: relative;
	width: 100%;
`;

const StyledSuggestionsWrapper = styled.div`
	position: absolute;
	background-color: white;
	width: 100%;
	max-width: 600px;
	padding: 16px;
	top: 70%;
	box-shadow: rgba(54, 60, 75, 0.1) 0px 16px 32px -8px;
	border-radius: 6px;
`;

const renderOptions = cities => (
	<LinksList
		getPath={item =>
			getDetailPath({
				name: item.name,
				country: item.country,
				coordinates: transformCoordinatesToUrlParam(item.coordinates),
			})
		}
		options={cities}
		render={city => `${city.name} ${city.country}`}
	/>
);

function CitiesSearch({ repository }) {
	const [value, setValue] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const { cities } = useCitySelector({ search: value, repository });
	const ref = useRef(null);
	useClickOutside(ref, () => setIsFocused(false));

	const renderSuggestionsContent = cities => {
		if (!value) return null;
		if (!isCityNameValid(value))
			return (
				<Notification type='error'>
					{translations.dashboard.input_search_error}
				</Notification>
			);
		if (!cities.length)
			return (
				<Notification type='info'>
					{translations.dashboard.no_search_results}
				</Notification>
			);
		return renderOptions(cities);
	};

	return (
		<StyledCitySearchConatiner ref={ref}>
			<InputText
				name='search'
				placeholder={translations.dashboard.input_search_placeholder}
				onChange={e => setValue(e.target.value)}
				value={value}
				onFocus={() => setIsFocused(true)}
			/>
			{isFocused && value && (
				<StyledSuggestionsWrapper>
					{renderSuggestionsContent(cities)}
				</StyledSuggestionsWrapper>
			)}
		</StyledCitySearchConatiner>
	);
}

export default CitiesSearch;
