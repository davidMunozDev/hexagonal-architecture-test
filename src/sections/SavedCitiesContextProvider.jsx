import { createContext, useContext, useEffect, useState } from 'react';

import { addSavedCityUseCase } from '@/modules/savedCities/application/add';
import {
	deleteSavedCityUseCase,
	deleteAllSavedCitiesUseCase,
} from '@/modules/savedCities/application/delete';
import { getAllSavedCities } from '@/modules/savedCities/application/get';
import { getSavedCityId } from '@/modules/savedCities/domain/SavedCity';

const SavedCitiesContext = createContext({});

export function SavedCitiesContextProvider({ children, repository }) {
	const [savedCities, setSavedCities] = useState([]);

	useEffect(() => {
		getSavedCities();
	}, []);

	const getSavedCities = () => {
		getAllSavedCities(repository)().then(cities => {
			setSavedCities(cities);
		});
	};

	const addSavedCity = async city => {
		await addSavedCityUseCase(repository)(city);
		getSavedCities();
	};

	const deleteSavedCity = async city => {
		await deleteSavedCityUseCase(repository)(getSavedCityId(city));
		getSavedCities();
	};

	const deleteAllSavedCities = async () => {
		await deleteAllSavedCitiesUseCase(repository)();
		getSavedCities();
	};

	return (
		<SavedCitiesContext.Provider
			value={{
				savedCities,
				addSavedCity: addSavedCity,
				deleteSavedCity,
				deleteAllSavedCities,
			}}
		>
			{children}
		</SavedCitiesContext.Provider>
	);
}

export const useSavedCitiesContext = () => useContext(SavedCitiesContext);
