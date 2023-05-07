import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';


import { GetDocumentByIdResponse } from '@/types/document.type';
import { Fragment, useState, useEffect, useRef, ChangeEvent } from 'react';
import { borderColor } from '@/style/Variables';
import { CustomButton } from '@/components/Custom/CustomButton';
import { BoxPDFView } from '@/style/BoxModalSx';
import { CustomEditInput } from '@/components/Custom/CustomEditInput';

interface EditorProps {
	document: GetDocumentByIdResponse;
	documentContent: any;
	onChange: Function;
	onCreate: Function;
}

const BoxContainerSx = {
	height: '100%',
	width: '100%'
};
const BoxLeftSx = {
	height: '100%',
	width: '100%'
};
const BoxRightSx = {
	height: '80vh',
	width: '100%',
	textAlign: 'center',
	borderLeft: `3px solid ${borderColor}`
};



const Editor = (props: EditorProps) => {


	const { document, documentContent, onChange, onCreate } = props;
	const NFC = 'No file chosen'

	const [IsSetUp, setIsSetUp] = useState(false);
	const [IsFileUploaded, setIsFileUploaded] = useState(NFC);
	const [PreviewPdfFile, setPreviewPdfFile] = useState<any>(null);
	const [type, setType] = useState('PDF');

	const fileRef = useRef<HTMLInputElement>(null);
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	const handleChange = (event: SelectChangeEvent) => {
		setType(event.target.value as string);
	};

	const uploadFile = () => {
		if (fileRef.current) {
			fileRef.current.click();
		}
	};
	const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {

		if (e.target.name === 'file') {
			if (e.target.files) {
				console.log("hello")
				setIsFileUploaded(e.target.files[0].name)
				setPreviewPdfFile(e.target.files[0])
			}
		}
	}

	const onCanelFileChange = () => {
		setPreviewPdfFile(undefined)
		setIsFileUploaded(NFC)
		if (fileRef.current) {
			fileRef.current.value = ''
		}
	}

	useEffect(() => {
		if (documentContent) {
			setIsSetUp(true);
			setType(document.Contents[0].ContentTypeId === 2 ? 'PDF' : 'Other');
		}
	}, [document, documentContent]);

	return (
		<Box sx={BoxContainerSx}>
			<Stack flexDirection="column" rowGap={4} height="100%">
				<Typography variant="h6">{document.Title}</Typography>
				<Stack flexDirection="row" width="100%" height="100%" padding="0.75rem">
					<Box sx={BoxLeftSx}>
						<Stack
							flexDirection="column"
							width="100%"
							height="100%"
							alignItems="center"
							justifyContent="flex-start"
							rowGap={3}
						>
							{!IsSetUp ? (
								<Fragment>
									<Typography variant="subtitle1">Decide a type</Typography>
									<Box sx={{ width: '40%' }}>
										<FormControl fullWidth>
											<Select value={type} onChange={handleChange}>
												<MenuItem value={'PDF'}>PDF</MenuItem>
												<MenuItem value={'File'}>File</MenuItem>
												<MenuItem value={'Markdown'}>Markdown</MenuItem>
											</Select>
										</FormControl>
									</Box>
									<CustomButton
										content="Set Up Document"
										onClick={() => {
											setIsSetUp(true);
										}}
									/>
								</Fragment>
							) : (
								<Fragment>
									<Typography variant="subtitle1">Type : {type}</Typography>
									<CustomButton content="Upload" onClick={uploadFile} />
									<input id="fileUpload" name="file" type="file" hidden ref={fileRef} onChange={
										(e) => {
											console.log("1")
											onChange(e);
											onFileChange(e);
										}
									} />
									<Typography variant="subtitle1">{IsFileUploaded}</Typography>
									<CustomEditInput
										isNotDisplay={true}
										label="Avatar"
										value={""}
										onChange={() => { }}
										onCancel={onCanelFileChange}
										onSave={() => { onCreate(); setIsFileUploaded(NFC) }}
										isAvatarChange={IsFileUploaded.length > 0 && IsFileUploaded != NFC}
									/>
								</Fragment>
							)}
							<Typography variant="subtitle1" width="40%" textAlign="center">
								Markdown and PDF can be viewed directly in the broswer, whereas file can only be
								downloaded
							</Typography>
						</Stack>
					</Box>
					<Box sx={BoxRightSx}>
						{document.Contents.length > 0 ? (
							<Box sx={BoxPDFView}>
								<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
									<Viewer
										defaultScale={SpecialZoomLevel.PageFit}
										fileUrl={URL.createObjectURL(documentContent)}
									// fileUrl={PreviewPdfFile ? URL.createObjectURL(PreviewPdfFile) : URL.createObjectURL(documentContent)}
									/>
								</Worker>

								{/* <Typography variant="subtitle1">File: {documentContent.size}</Typography> */}
							</Box>
						) : (
							<Typography variant="h6">No contents to preview.</Typography>
						)}
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Editor;
