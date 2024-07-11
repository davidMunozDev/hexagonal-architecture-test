import Dashboard from '@/sections/dashboard/Dashboard';
import { createApiCitiesRepository } from '@/modules/cities/infrastructure/ApiCitiesRepository';
const citiesRepository = createApiCitiesRepository();

function DashboardFactory() {
	return <Dashboard citiesRepository={citiesRepository} />;
}

export default DashboardFactory;
