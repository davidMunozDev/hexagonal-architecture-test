import { useState, useEffect } from 'react';
import { getAllCities } from '@/modules/cities/application/getAll';
import { isCityNameValid } from '@/modules/cities/domain/City';

export function useCitySelector({ search, repository }) {
	const [cities, setCities] = useState([]);

	useEffect(() => {
		if (!search || !isCityNameValid(search)) {
			resetCities();
			return;
		}
		const timeoutId = setTimeout(async () => {
			const cities = await getAllCities(repository)(search);
			setCities(cities || []);
		}, 400);

		return () => clearTimeout(timeoutId);
	}, [search]);

	const resetCities = () => {
		setCities([]);
	};

	return { cities };
}
