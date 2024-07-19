import { City } from '@/modules/cities/domain/City';

export interface CityRepository {
	getAll: (city: string) => Promise<City[]>;
}
