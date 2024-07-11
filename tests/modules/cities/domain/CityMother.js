import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

const CityFactory = Factory.define(() => ({
	name: faker.location.city(),
	coordinates: [faker.location.latitude(), faker.location.longitude()],
	country: faker.location.country(),
}));

export const CityMother = {
	create: params => CityFactory.build(params),
	createList: length => CityFactory.buildList(length),
	createWithInvalidCityName: () =>
		CityFactory.build({ name: faker.helpers.fromRegExp('[^a-zA-Z]') }),
	createWithInvalidCityCountry: () =>
		CityFactory.build({ country: faker.helpers.fromRegExp('[^a-zA-Z]') }),
	createWithInvalidCityCoordinates: () =>
		CityFactory.build({
			coordinates: [
				faker.helpers.fromRegExp('[^0-9]'),
				faker.helpers.fromRegExp('[^0-9]'),
			],
		}),
};
