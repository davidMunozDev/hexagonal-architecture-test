import { describe, it, expect } from 'vitest';
import {
	isCityNameValid,
	isCityValid,
	isCityCountryValid,
	areCoordinatesValid,
	transformCoordinatesFromUrlParam,
	transformCoordinatesToUrlParam,
} from '@/modules/cities/domain/City';
import { CityMother } from './CityMother';

const validCity = CityMother.create();
const invalidCity = {
	name: CityMother.createWithInvalidCityName(),
	country: CityMother.createWithInvalidCityCountry(),
	coordinates: CityMother.createWithInvalidCityCoordinates(),
};

describe('City domain', () => {
	describe('isCityNameValid', () => {
		it('should return true when valid city name', () => {
			expect(isCityNameValid(validCity.name)).toBe(true);
		});
		it('should return true when invalid city name', () => {
			expect(isCityNameValid(invalidCity.name)).toBe(false);
		});
	});

	describe('isCityCountryValid', () => {
		it('should return true when valid city country', () => {
			expect(isCityCountryValid(validCity.country)).toBe(true);
		});
		it('should return true when invalid city country', () => {
			expect(isCityCountryValid(invalidCity.country)).toBe(false);
		});
	});

	describe('areCoordinatesValid', () => {
		it('should return true when valid city coordinates', () => {
			expect(areCoordinatesValid(validCity.coordinates)).toBe(true);
		});
		it('should return true when invalid city coordinates', () => {
			expect(areCoordinatesValid(invalidCity.coordinates)).toBe(false);
		});
	});

	describe('isCityValid', () => {
		it('should return true when valid city', () => {
			expect(isCityValid(validCity)).toBe(true);
		});
		it('should return true when invalid city', () => {
			expect(isCityValid(invalidCity)).toBe(false);
		});
	});

	describe('transformCoordinatesFromUrlParam', () => {
		it('should return true when valid city', () => {
			const urlParam = validCity.coordinates.join(',');

			expect(transformCoordinatesFromUrlParam(urlParam)).toMatchObject(
				validCity.coordinates,
			);
		});
	});
	describe('transformCoordinatesToUrlParam', () => {
		it('should return true when valid city', () => {
			const urlParam = `${validCity.coordinates[0]},${validCity.coordinates[1]}`;

			expect(transformCoordinatesToUrlParam(validCity.coordinates)).toEqual(
				urlParam,
			);
		});
	});
});
