export const PATHS = {
	base: '/',
	dashboard: '/BBVA-Technical-Test/',
	detail: '/BBVA-Technical-Test/detail/:name/:country',
};

export const getDetailPath = ({ name, country, coordinates }) => {
	const mainPath = PATHS.detail
		.replace(':name', name)
		.replace(':country', country);
	return `${mainPath}?coordinates=${coordinates}`;
};
