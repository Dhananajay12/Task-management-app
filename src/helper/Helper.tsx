export const setLocalStorageData = (key: string, data: any) => {
	localStorage.setItem(key, JSON.stringify(data));
};

// Custom function to get data from localStorage
export const getLocalStorageData = (key: string) => {
	const storedData = localStorage.getItem(key);
	return storedData ? JSON.parse(storedData) : null;
}