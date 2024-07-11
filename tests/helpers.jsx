import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SavedCitiesContextProvider } from '@/sections/SavedCitiesContextProvider';
import { createLocalStorageSavedCitiesRepository } from '@/modules/savedCities/infrastructure/LocalStorageSavedCitiesRepository';
import { PATHS } from '@/router/paths';

const savedCitiesDefaultRepository = createLocalStorageSavedCitiesRepository();

export const renderWithRouterAndSavedCitiesContext = (
	ui,
	{
		route = PATHS.dashboard,
		path = PATHS.dashboard,
		repository = savedCitiesDefaultRepository,
	} = {},
) => {
	return {
		...render(
			<SavedCitiesContextProvider repository={repository}>
				<MemoryRouter initialEntries={[route]}>
					<Routes>
						<Route path={path} element={ui} />
					</Routes>
				</MemoryRouter>
			</SavedCitiesContextProvider>,
		),
	};
};

export const renderWithRouter = (
	ui,
	{ route = PATHS.dashboard, path = PATHS.dashboard, wrapper } = {},
) => {
	return {
		...render(
			<MemoryRouter initialEntries={[route]}>
				<Routes>
					<Route path={path} element={ui} />
				</Routes>
			</MemoryRouter>,
			{ wrapper },
		),
	};
};
