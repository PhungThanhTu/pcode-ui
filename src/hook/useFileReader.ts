import { ChangeEvent, useState, useEffect } from 'react';

export const useImageFileReader = () => {
	const [B64Value, setB64Value] = useState('');

	const getImageB64Value = (e: ChangeEvent<HTMLInputElement>) => {
		var file = e.target.files;
		if (FileReader && file && file.length) {
			var fr = new FileReader();
			fr.onload = function () {
				if (fr.result) {
					setB64Value(fr.result.toString());
				}
			};
			fr.readAsDataURL(file[0]);
		}
	};

	return { B64Value, getImageB64Value };
};

// others file reader in future
