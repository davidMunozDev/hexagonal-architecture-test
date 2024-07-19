import { SavedCity } from './SavedCity';
import { City } from '@/modules/cities/domain/City';

export interface SavedCityRepository {
	get: () => Promise<SavedCity[]>;
	save: (city: City) => Promise<void>;
	delete: (id: string) => Promise<void>;
	deleteAll: () => Promise<void>;
}
