export const setLocalStorageData = (key: string, data: any) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorageData = (key: string) => {
	const storedData = localStorage.getItem(key);
	return storedData ? JSON.parse(storedData) : null;
}; 

export const CalculatePriority = (date: string) => {
	const today = new Date();
	const tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 1);

	const inputDate = new Date(date);
	inputDate.setHours(0, 0, 0, 0);

	console.log(inputDate.toDateString(), today.toDateString())
	if (inputDate.toDateString() === today.toDateString()) {
		return 'High';
	} else if (inputDate.toDateString() === tomorrow.toDateString()) {
		return 'Medium';
	} else {
		return 'Low';
	}
}
