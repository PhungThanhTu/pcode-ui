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
	}
};
