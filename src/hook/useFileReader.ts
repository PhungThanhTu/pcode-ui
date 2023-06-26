import JSZip from 'jszip';
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

export const usePdfReader = () => {

	const [PdfFile, setPdfFile] = useState<any>(null);

	const getFile = (e: ChangeEvent<HTMLInputElement>) => {
		var file = e.target.files;
		if (FileReader && file && file.length) {
			setPdfFile(file[0]);
		}
	};

	return { PdfFile, getFile };
};

export const useFileReader = () => {
	const [file, setFile] = useState<Blob>()

	const zip = new JSZip();

	const read = async (zipData: Blob) => {
		try {
			const result = await zip.loadAsync(zipData);
			result.generateAsync({ type: "blob" }).then(function (content) {
				setFile(content)
			})
			
			// // Access individual files in the zip
			// result.forEach(async (relativePath, zipEntry) => {
			// 	const fileData = await zipEntry.async('blob');
				
			// 	// Perform operations on the file data
			// 	// For example, save the file using file-saver library
			// 	// (fileData, zipEntry.name);
			// });


		} catch (error) {
			console.error('Error reading the zip file:', error);
		}
	}

	return { file, read }

};
