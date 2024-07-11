export const getTimeFromDateStr = dateStr => {
	const date = new Date(dateStr);
	const minutes = date.getMinutes();
	return `${date.getHours()}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const getDayFromDateStr = dateStr => {
	const options = { weekday: 'long' };
	const date = new Date(dateStr).toLocaleDateString('en-US', options);
	const today = new Date().toLocaleDateString('en-US', options);

	return today === date ? 'Today' : date;
};
