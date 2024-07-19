import { Router } from './router/Router';
import { SavedCitiesContextProvider } from '@/sections/SavedCitiesContextProvider';
import { createLocalStorageSavedCitiesRepository } from '@/modules/savedCities/infrastructure/LocalStorageSavedCitiesRepository';
const savedCitiesRepository = createLocalStorageSavedCitiesRepository();

function App() {
	return (
		<SavedCitiesContextProvider repository={savedCitiesRepository}>
			<Router />
		</SavedCitiesContextProvider>
	);
}

export default App;
