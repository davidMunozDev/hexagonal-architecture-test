export const PATHS = {
	base: '/',
	dashboard: '/hexagonal-architecture-test/',
	detail: '/hexagonal-architecture-test/detail/:name/:country',
};

export const getDetailPath = ({
	name,
	country,
	coordinates,
}: {
	name: string;
	country: string;
	coordinates: string;
}): string => {
	const mainPath = PATHS.detail
		.replace(':name', name)
		.replace(':country', country);
	return `${mainPath}?coordinates=${coordinates}`;
};
