import { ChangeEvent, useState } from 'react';

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

export const usePDFFileReader = () => {

	const [PdfFile, setPdfFile] = useState<any>(null);

	const getFile = (e: ChangeEvent<HTMLInputElement>) => {
		var file = e.target.files;
		if (FileReader && file && file.length) {
			// var fr = new FileReader();
			// fr.onload = function () {
			// 	if (fr.result) {
					
			// 	}
			// };
			// fr.readAsDataURL();
			setPdfFile(file[0]);
		}
	};

	return { PdfFile, getFile };
};
// others file reader in future
