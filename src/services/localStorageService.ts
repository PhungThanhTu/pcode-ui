import { codeCache } from '@/constant/Local';

export const LocalStorageService = {
	setCodeCache: function (data: any) {
		localStorage.setItem(codeCache, JSON.stringify(data));
	},
	getCodeCache: function () {
		let value = localStorage.getItem(codeCache);
		return value ? JSON.parse(value) : null;
	},
	clearCodeCache: function () {
		localStorage.removeItem(codeCache);
	},
	setLocalStorage: function (key: string, data: any) {
		localStorage.setItem(key, JSON.stringify(data));
	},
	getLocalStorage: function (key: string) {
		let value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	},
	clearLocalStorage: function (key: string) {
		localStorage.removeItem(key);
	},
};
