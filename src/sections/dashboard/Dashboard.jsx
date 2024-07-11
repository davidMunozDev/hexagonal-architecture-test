import CitiesSearch from '@/sections/dashboard/CitiesSearch';
import SavedCitiesList from '@/sections/dashboard/SavedCitiesList';
import styled from 'styled-components';

const StyledContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 32px;
	width: 100%;
`;

function Dashboard({ citiesRepository }) {
	return (
		<StyledContainer>
			<CitiesSearch repository={citiesRepository} />
			<SavedCitiesList />
		</StyledContainer>
	);
}

export default Dashboard;
