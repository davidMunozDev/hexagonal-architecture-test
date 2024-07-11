import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { WEATHER_WIDGET_STATUS } from '@/sections/detail/useWeatherWidget';

const DailyMotherFactory = Factory.define(() => ({
	day: faker.date.weekday(),
	maxTemperature: faker.number.float({ max: 100, precision: 0.1 }),
	minTemperature: faker.number.float({ max: 100, precision: 0.1 }),
	weather: faker.helpers.arrayElement(Object.values(WEATHER_WIDGET_STATUS)),
}));

const WeatherReportFactory = Factory.define(() => ({
	temperature: faker.number.float({ max: 100, precision: 0.1 }),
	maxTemperature: faker.number.float({ max: 100, precision: 0.1 }),
	minTemperature: faker.number.float({ max: 100, precision: 0.1 }),
	is_day: faker.datatype.boolean(),
	weather: faker.helpers.arrayElement(Object.values(WEATHER_WIDGET_STATUS)),
	sunrise: faker.helpers.regexpStyleStringParse('[1-24]:[00-59]'),
	sunset: faker.helpers.regexpStyleStringParse('[1-24]:[00-59]'),
	daily: [DailyMother.create()],
}));

export const DailyMother = {
	create: params => DailyMotherFactory.build(params),
	createList: lenght => DailyMotherFactory.buildList(lenght),
};

export const WeatherReportMother = {
	create: params => WeatherReportFactory.build(params),
};
