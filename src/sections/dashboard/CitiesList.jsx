import Link from '@/sections/shared/Link';
import { getDetailPath } from '@/router/paths';
import { transformCoordinatesToUrlParam } from '@/modules/cities/domain/City';

function CitiesList({ cities }) {
	return (
		<ul>
			{cities.map(city => (
				<li key={city.id}>
					<Link
						to={getDetailPath({
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
