import { describe, it, expect } from 'vitest';
import {
	createSavedCity,
	addSavedCity,
	isSavedCity,
	removeSavedCity,
} from '@/modules/savedCities/domain/SavedCity';
import { CityMother } from '../../cities/domain/CityMother';
import { SavedCityMother } from '../../savedCities/domain/SavedCityMother';

const city = CityMother.create();

describe('Saved City domain', () => {
	describe('createSavedCity', () => {
		it('should ceate the saved city adding the id', () => {
			const hasId = !!Object.getOwnPropertyDescriptor(
				createSavedCity(city),
				'id',
			);

			expect(hasId).toBe(true);
		});
	});

	describe('isSavedCity', () => {
		it('should return true if is a saved city', () => {
			const savedCity = SavedCityMother.create();
			const savedCities = [savedCity];

			expect(isSavedCity(savedCities, savedCity)).toBe(true);
		});

		it('should return false if is not a saved city', () => {
			const savedCity = SavedCityMother.create();
			const savedCities = [SavedCityMother.create()];

			expect(isSavedCity(savedCities, savedCity)).toBe(false);
		});
	});

	describe('addSavedCity', () => {
		it('should add the city to the saved cities list if it is not saved', () => {
			const savedCity = SavedCityMother.create();
			const savedCities = [SavedCityMother.create()];
			const expectedSavedCities = [...savedCities, savedCity];

			expect(addSavedCity(savedCities, savedCity)).toMatchObject(
				expectedSavedCities,
			);
		});

		it('should not add the city to the saved cities list if it is saved', () => {
			const savedCity = SavedCityMother.create();
			const savedCities = [savedCity];

			expect(addSavedCity(savedCities, savedCity)).toMatchObject(savedCities);
		});
	});

	describe('removeSavedCity', () => {
		it('should remove the city from the saved cities list', () => {
			const savedCity = SavedCityMother.create();
			const savedCities = [savedCity];

			expect(removeSavedCity(savedCities, savedCity.id)).toMatchObject([]);
		});
	});
});
