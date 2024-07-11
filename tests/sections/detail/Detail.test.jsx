import {
	fireEvent,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import Detail from '@/sections/detail/Detail';
import { WeatherReportMother } from '../../modules/weatherReports/domain/WeatherReportMother';
import { CityMother } from '../../modules/cities/domain/CityMother';
import { SavedCityMother } from '../../modules/savedCities/domain/SavedCityMother';
import { getDetailPath } from '@/router/paths';
import { transformCoordinatesToUrlParam } from '@/modules/cities/domain/City';
import { renderWithRouterAndSavedCitiesContext } from '../../helpers';
import { createLocalStorageSavedCitiesRepository } from '@/modules/savedCities/infrastructure/LocalStorageSavedCitiesRepository';
import { PATHS } from '@/router/paths';
import translations from '@/translations';

const savedCitiesRepository = createLocalStorageSavedCitiesRepository();
const defaultWeatherReport = WeatherReportMother.create();
const defaultWeatherRepository = {
	get: () => defaultWeatherReport,
};
const renderDetail = ({
	repository = defaultWeatherRepository,
	route,
	saveCitiesOverride = {},
}) =>
	renderWithRouterAndSavedCitiesContext(
		<Detail weatherRepository={repository} />,
		{
			route,
			path: PATHS.detail,
			repository: { ...savedCitiesRepository, ...saveCitiesOverride },
		},
	);
const { country, coordinates, name } = CityMother.create();

describe('Detail page', () => {
	describe('Current weather section data functionality', () => {
		it('should request the weather info when the correct city data is given', async () => {
			renderDetail({
				route: getDetailPath({
					name,
					country,
					coordinates: transformCoordinatesToUrlParam(coordinates),
				}),
			});
			await waitForElementToBeRemoved(() =>
				screen.getByText(translations.detail.loading),
			);
			const screenWeather = screen.getByText(defaultWeatherReport.weather);

			expect(screenWeather).toBeInTheDocument();
		});

		it('should show error message when incorrect city name is given', async () => {
			const invalidCityName = CityMother.createWithInvalidCityName().name;

			renderDetail({
				route: getDetailPath({
					name: invalidCityName,
					country,
					coordinates: transformCoordinatesToUrlParam(coordinates),
				}),
			});
			const error = screen.getByText(translations.detail.error);

			expect(error).toBeInTheDocument();
		});

		it('should not call the api with invalid params', async () => {
			const invalidCountry = CityMother.createWithInvalidCityCountry().country;
			const repository = {
				get: vi.fn(),
			};

			renderDetail({
				repository,
				route: getDetailPath({
					name,
					country: invalidCountry,
					coordinates,
				}),
			});

			expect(repository.get).not.toHaveBeenCalled();
		});
	});

	describe('Daily weather section functionality', () => {
		it('should render the weather daily list when daily data is provided', async () => {
			renderDetail({
				route: getDetailPath({
					name,
					country,
					coordinates,
				}),
			});

			await waitForElementToBeRemoved(() =>
				screen.getByText(translations.detail.loading),
			);

			const dailyItem = await screen.getByText(
				defaultWeatherReport.daily[0].day,
			);

			expect(dailyItem).toBeInTheDocument();
		});

		it('should not render the weather daily list when daily data is not provided', async () => {
			renderDetail({
				repository: {
					get: () => WeatherReportMother.create({ daily: [] }),
				},
				route: getDetailPath({
					name,
					country,
					coordinates,
				}),
			});
			await waitForElementToBeRemoved(() =>
				screen.getByText(translations.detail.loading),
			);
			const title = screen.getByText(translations.detail.daily_title);

			expect(title).toBeInTheDocument();
		});
	});

	describe('Saved cities section functionality', () => {
		it('should be able to add a city', async () => {
			const addSpy = vi.spyOn(savedCitiesRepository, 'save');

			renderDetail({
				route: getDetailPath({
					name,
					country,
					coordinates: transformCoordinatesToUrlParam(coordinates),
				}),
				saveCitiesOverride: {
					get: () => Promise.resolve([]),
				},
			});
			await waitFor(() => screen.getByText(translations.detail.add_button));
			fireEvent.click(screen.getByText(translations.detail.add_button));

			expect(addSpy).toHaveBeenCalled();
		});

		it('should be able to delete a city', async () => {
			const deleteSpy = vi.spyOn(savedCitiesRepository, 'delete');
			const savedCity = SavedCityMother.create();

			renderDetail({
				route: getDetailPath({
					name,
					country,
					coordinates: transformCoordinatesToUrlParam(savedCity.coordinates),
				}),
				saveCitiesOverride: {
					get: () => Promise.resolve([savedCity]),
				},
			});
			await waitFor(() => screen.getByText(translations.detail.delete_button));
			fireEvent.click(screen.getByText(translations.detail.delete_button));

			expect(deleteSpy).toHaveBeenCalled();
		});
	});
});
