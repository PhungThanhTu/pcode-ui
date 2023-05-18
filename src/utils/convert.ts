export const labelToProperty = (str: String) => {
	let tmp = str.trim().split(' ');
	tmp[0] = tmp[0].toLowerCase();

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

export const parseToLocalDate = (date_ISO: Date) => {
	var date = new Date(date_ISO);

	var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = date.getFullYear();

	return yyyy + '-' + mm + '-' + dd;
};
export const parseToISOSDate = (date_local: Date) => {
	var date = new Date(date_local);
	// var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
	//     date.getUTCDate(), date.getUTCHours(),
	//     date.getUTCMinutes(), date.getUTCSeconds());

	return date.toISOString();
};
export const today = () => {
	var date = new Date();

	var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = date.getFullYear();

	return yyyy + '-' + mm + '-' + dd;
};
