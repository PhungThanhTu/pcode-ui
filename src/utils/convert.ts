import { useTabContext } from "@mui/lab";

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

export const parseToLocalDate = (date_UTC: string) => {
	if (date_UTC) {


		var date = new Date(date_UTC);

		// var date = new Date(UTC.getTime() - offset);



		var dd = String(date.getDate()).padStart(2, '0');
		var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = date.getFullYear();

		var hh = date.getHours();
		var mn = date.getMinutes();

		return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mn;
	}
	return getToday();
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

	if (type === 'date')
		return yyyy + '-' + mm + '-' + dd;
	else if (type === 'time')
		return hh + ':' + mn;

	return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mn;
};

export const getNextDay = (type?: string) => {

	var nowDate = new Date();
	var nexDate = new Date(nowDate.getDate() + 1);

	var dd = String(nexDate.getDate()).padStart(2, '0');
	var mm = String(nexDate.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = nexDate.getFullYear();

	var hh = nexDate.getHours();
	var mn = nexDate.getMinutes();

	if (type === 'date')
		return yyyy + '-' + mm + '-' + dd;
	else if (type === 'time')
		return hh + ':' + mn;

	return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mn;

}