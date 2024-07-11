import {
	fireEvent,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import SavedCitiesList from '@/sections/dashboard/SavedCitiesList';
import { createLocalStorageSavedCitiesRepository } from '@/modules/savedCities/infrastructure/LocalStorageSavedCitiesRepository';
import { renderWithRouterAndSavedCitiesContext } from '../../helpers';
import { SavedCityMother } from '../../modules/savedCities/domain/SavedCityMother';
import translations from '@/translations';

const renderSavedCitiesList = repository =>
	renderWithRouterAndSavedCitiesContext(<SavedCitiesList />, { repository });
const savedCitiesRepository = createLocalStorageSavedCitiesRepository();

describe('SavedCities List component', () => {
	it('should render the list of saved cities if have saved cities in local storage', async () => {
		const length = 10;
		const savedCitiesData = SavedCityMother.createList(length);

		renderSavedCitiesList({
			...savedCitiesRepository,
			get: () => Promise.resolve(savedCitiesData),
		});
		await waitForElementToBeRemoved(() =>
			screen.getByText(translations.dashboard.no_saved_cities),
		);

		const firstSavedCity = screen.getByText(
			`${savedCitiesData[0].name}, ${savedCitiesData[0].country}`,
		);

		expect(firstSavedCity).toBeInTheDocument();
	});

	it('should not render the list of saved cities if the list of saved cities in local storage is empty', async () => {
		renderSavedCitiesList({
			...savedCitiesRepository,
			get: () => Promise.resolve([]),
		});

		const emptyState = screen.getByText(translations.dashboard.no_saved_cities);

		expect(emptyState).toBeInTheDocument();
	});

	it('should call repository deleteAll fn when click on delete all button', async () => {
		const repository = {
			...savedCitiesRepository,
			get: () => Promise.resolve(SavedCityMother.createList(10)),
		};
		const deleteAllSpy = vi.spyOn(repository, 'deleteAll');

		renderSavedCitiesList(repository);
		await waitForElementToBeRemoved(() =>
			screen.getByText(translations.dashboard.no_saved_cities),
		);
		const deleteButton = await screen.getByText(
			translations.dashboard.delete_all_saved_cities,
		);
		fireEvent.click(deleteButton);

		expect(deleteAllSpy).toHaveBeenCalled();
	});

	it('should call repository deleteAll fn when click on delete all button', async () => {
		const repository = {
			...savedCitiesRepository,
			get: () => Promise.resolve(SavedCityMother.createList(10)),
		};
		const deleteSpy = vi.spyOn(repository, 'delete');

		renderSavedCitiesList(repository);
		await waitForElementToBeRemoved(() =>
			screen.getByText(translations.dashboard.no_saved_cities),
		);
		fireEvent.click(
			await screen.getAllByText(translations.dashboard.delete_saved_city)[0],
		);

		expect(deleteSpy).toHaveBeenCalled();
	});
});
