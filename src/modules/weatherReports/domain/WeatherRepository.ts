import { Coordinates } from '@/modules/cities/domain/City';
import { Weather } from './Weather';

export interface WeatherRepository {
	get: (coordinates: Coordinates) => Promise<Weather>;
}
