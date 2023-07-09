import { TestResultStatus } from '@/config';

export const LabelToProperty = (str: String) => {
	let tmp = str.trim().split(' ');
	tmp[0] = tmp[0].toLowerCase();

	return tmp.join('');
};

export const NameToField = (name: string, upper: boolean) => {
	let tmp = name.trim().split(' ');

	if (upper) tmp[0] = tmp[0].charAt(0).toUpperCase() + tmp[0].substring(1);
	else tmp[0] = tmp[0].toLowerCase();

	return tmp.join('');
};

export const positiveNumber = (number: number) => {
	let temp = Number(number);
	if (temp > 0) return temp;
	return 0;
};

export const positiveNumberWithMin = (number: number, min: number) => {
	let temp = Number(number);
	let Min = Number(min);
	if (temp > 0 && temp >= Min) return temp;
	return Min;
};

export const parseToLocalDate = (date_UTC: string) => {
	if (date_UTC) {
		// const dateTime = new Date(date_UTC);

		// const year = dateTime.getUTCFullYear();
		// const month = ('0' + (dateTime.getUTCMonth() + 1)).slice(-2);
		// const day = ('0' + dateTime.getUTCDate()).slice(-2);
		// const hours = ('0' + dateTime.getUTCHours()).slice(-2);
		// const minutes = ('0' + dateTime.getUTCMinutes()).slice(-2);
		// const seconds = ('0' + dateTime.getUTCSeconds()).slice(-2);

		// const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

		// return formattedDateTime

		var date = new Date(date_UTC);
		var dd = String(date.getDate()).padStart(2, '0');
		var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = date.getFullYear();

		var hh = String(date.getHours()).padStart(2, '0');
		var mn = String(date.getMinutes()).padStart(2, '0');

		return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mn;
	}
	return getNextDay();
};
export const parseToLocalDateTime = (date_UTC: string) => {
	if (date_UTC) {
		// const dateTime = new Date(date_UTC);

		// const year = dateTime.getUTCFullYear();
		// const month = ('0' + (dateTime.getUTCMonth() + 1)).slice(-2);
		// const day = ('0' + dateTime.getUTCDate()).slice(-2);
		// const hours = ('0' + dateTime.getUTCHours()).slice(-2);
		// const minutes = ('0' + dateTime.getUTCMinutes()).slice(-2);
		// const seconds = ('0' + dateTime.getUTCSeconds()).slice(-2);

		// const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

		// return formattedDateTime

		var date = new Date(date_UTC);
		var dd = String(date.getDate()).padStart(2, '0');
		var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = date.getFullYear();

		var hh = String(date.getHours()).padStart(2, '0');
		var mn = String(date.getMinutes()).padStart(2, '0');
		var ss = String(date.getSeconds()).padStart(2, '0');

		return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mn + ':' + ss ;
	}
	return getNextDay();
};

export const parseToISOSDate = (date_local: Date) => {
	var date = new Date(date_local);
	// var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
	//     date.getUTCDate(), date.getUTCHours(),
	//     date.getUTCMinutes(), date.getUTCSeconds());
	return date.toISOString();
};
export const getToday = (type?: string) => {
	var date = new Date();

	var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = date.getFullYear();

	var hh = date.getHours();
	var mn = date.getMinutes();

	if (type === 'date') return yyyy + '-' + mm + '-' + dd;
	else if (type === 'time') return hh + ':' + mn;

	return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mn;
};

export const getNextDay = (type?: string) => {
	var nowDate = new Date();
	let nextDate = new Date();

	for (let i = 0; i < 25; i++) {
		const nextHour = new Date(nowDate); // Create a new date object with the current date and time
		nextHour.setHours(nowDate.getHours() + i); // Set the hour to the next hour
		nextDate = new Date(nextHour);
	}

	var dd = String(nextDate.getDate()).padStart(2, '0');
	var mm = String(nextDate.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = nextDate.getFullYear();

	var hh = String(nextDate.getHours()).padStart(2, '0');
	var mn = String(nextDate.getMinutes()).padStart(2, '0');

	if (type === 'date') return yyyy + '-' + mm + '-' + dd;
	else if (type === 'time') return hh + ':' + mn;

	return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mn;
};

export const getApiDateFormat = (date: string) => {
	let temp = date.replace('T', ' ').replace('.000Z', '');
	return temp.substring(0, 16);
};

export const TestResultStatusToMessage = (status: number) => {
	const testResulStatus = Object.values(TestResultStatus);

	let result = testResulStatus.filter((item) => item.status === status)[0];

	return result ? result.message : 'No Status';
};

export const toSize = (bytes: number) => {

	const kilobyte = 1024;
	const megabyte = kilobyte * 1024;

	if (bytes < kilobyte) {
		return bytes + ' bytes';
	} else if (bytes < megabyte) {
		return (bytes / kilobyte).toFixed(2) + ' KB';
	} else {
		return (bytes / megabyte).toFixed(2) + ' MB';
	}

}