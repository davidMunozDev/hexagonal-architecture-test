import Link from '@/sections/shared/Link';
import { getDetailPath } from '@/router/paths';
import { transformCoordinatesToUrlParam } from '@/modules/cities/domain/City';
import { SavedCity } from '@/modules/savedCities/domain/SavedCity';

function CitiesList({ cities }: { cities: SavedCity[] }) {
	return (
		<ul>
			{cities.map(city => (
				<li key={city.id}>
					<Link
						href={getDetailPath({
							name: city.name,
							country: city.country,
							coordinates: transformCoordinatesToUrlParam(city.coordinates),
						})}
					>
						{city.name} {city.country}
					</Link>
				</li>
			))}
		</ul>
	);
}

export default CitiesList;
