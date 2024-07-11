import Detail from '@/sections/detail/Detail';
import { createApiWeatherRepository } from '@/modules/weatherReports/infrastructure/ApiWeatherRepository';

const weatherRepository = createApiWeatherRepository();

function DetailFactory() {
	return <Detail weatherRepository={weatherRepository} />;
}

export default DetailFactory;
