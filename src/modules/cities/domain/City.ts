export type Coordinates = [number, number];

export interface City {
	name: string;
	country: string;
	coordinates: Coordinates;
}

const NUMBERS_AND_SPECIAL_CHARACTERS_REGEXP =
	/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\]/g;

export const isCityNameValid = (name: string): boolean => {
	const numbersRegExp = NUMBERS_AND_SPECIAL_CHARACTERS_REGEXP;
	return Boolean(!numbersRegExp.test(name));
};

export const isCityCountryValid = (country: string): boolean => {
	const numbersRegExp: RegExp = /[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\]/g;
	return Boolean(!numbersRegExp.test(country));
};

export const isCityValid = (city: City) => {
	return isCityNameValid(city?.name) && isCityCountryValid(city?.country);
};

export const transformCoordinatesFromUrlParam = (
	param: string,
): Coordinates => {
	const [latitude, longitude] = param.split(',');
	return [Number(latitude), Number(longitude)];
};

export const transformCoordinatesToUrlParam = (
	coordinates: Coordinates,
): string => {
	return coordinates.join(',');
};
