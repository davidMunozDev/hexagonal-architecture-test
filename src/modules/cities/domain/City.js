const NUMBERS_AND_SPECIAL_CHARACTERS_REGEXP =
	/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\]/g;

export const isCityNameValid = name => {
	const numbersRegExp = NUMBERS_AND_SPECIAL_CHARACTERS_REGEXP;
	return Boolean(!numbersRegExp.test(name));
};

export const isCityCountryValid = country => {
	const numbersRegExp = NUMBERS_AND_SPECIAL_CHARACTERS_REGEXP;
	return Boolean(!numbersRegExp.test(country));
};

export const areCoordinatesValid = coordinates => {
	return Boolean(
		Array.isArray(coordinates) &&
			coordinates?.length === 2 &&
			coordinates.every(
				coordinate => coordinate && typeof coordinate === 'number',
			),
	);
};

export const isCityValid = city => {
	return (
		isCityNameValid(city?.name) &&
		areCoordinatesValid(city?.coordinates) &&
		isCityCountryValid(city?.country)
	);
};

export const transformCoordinatesFromUrlParam = param => {
	const [latitude, longitude] = param.split(',');
	return [Number(latitude), Number(longitude)];
};

export const transformCoordinatesToUrlParam = coordinates => {
	return coordinates.join(',');
};
