import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { GetDocumentByIdResponse } from '@/types/document.type';
import { Fragment, useState, useEffect, useRef, ChangeEvent } from 'react';
import { borderColor } from '@/style/Variables';
import { CustomButton } from '@/components/Custom/CustomButton';
import { CustomEditInput } from '@/components/Custom/CustomEditInput';
import MyPDFViewer from '@/components/MyPDFViewer';

interface EditorProps {
	document: GetDocumentByIdResponse;
	documentContent: any;
	onChange: Function;
	onCreate: Function;
}

const BoxContainerSx = {
	height: '100%'
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
const BoxPDFViewSx = {
	overflow: 'auto',
	height: '100%'
};

const Editor = (props: EditorProps) => {
	const { document, documentContent, onChange, onCreate } = props;

	const NFC = 'No file chosen';

	const [IsSetUp, setIsSetUp] = useState(false);
	const [IsFileUploaded, setIsFileUploaded] = useState(NFC);
	const [PreviewPdfFile, setPreviewPdfFile] = useState<any>(null);
	const [Type, setType] = useState('PDF');
	const fileRef = useRef<HTMLInputElement>(null);

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
				setIsFileUploaded(e.target.files[0].name);
				setPreviewPdfFile(e.target.files[0]);
			}
		}
	};

	const onCancelFileChange = () => {
		setPreviewPdfFile(undefined);
		setIsFileUploaded(NFC);
		if (fileRef.current) {
			fileRef.current.value = '';
		}
	};

	useEffect(() => {
		if (documentContent) {
			setIsSetUp(true);
			setType(document.Contents[0].ContentTypeId === 2 ? 'PDF' : 'Markdown');
		} else {
			setIsSetUp(false);
			setType('PDF');
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
							{IsSetUp ? (
								<Fragment>
									<Typography variant="subtitle1">Type : {Type}</Typography>
									<CustomButton content="Upload" onClick={uploadFile} />
									<input
										id="fileUpload"
										name="file"
										type="file"
										hidden
										ref={fileRef}
										onChange={(e) => {
											onChange(e);
											onFileChange(e);
										}}
									/>
									<Typography variant="subtitle1">{IsFileUploaded}</Typography>
									<CustomEditInput
										isNotDisplay={true}
										label="Avatar"
										value={''}
										onChange={() => {}}
										onCancel={onCancelFileChange}
										onSave={() => {
											onCreate(Type, PreviewPdfFile);
											setIsFileUploaded(NFC);
											if (fileRef.current) {
												fileRef.current.value = '';
											}
										}}
										isAvatarChange={IsFileUploaded.length > 0 && IsFileUploaded != NFC}
									/>
								</Fragment>
							) : (
								<Fragment>
									<Typography variant="subtitle1">Decide a type</Typography>
									<Box sx={{ width: '40%' }}>
										<FormControl fullWidth>
											<Select value={Type} onChange={handleChange}>
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
							)}
							<Typography variant="subtitle1" width="40%" textAlign="center">
								Markdown and PDF can be viewed directly in the broswer, whereas file can only be
								downloaded
							</Typography>
						</Stack>
					</Box>
					<Box sx={BoxRightSx}>
						{PreviewPdfFile ? (
							<MyPDFViewer source={PreviewPdfFile} />
						) : document.Contents.length > 0 ? (
							<Box sx={BoxPDFViewSx}>
								<MyPDFViewer source={PreviewPdfFile ? PreviewPdfFile : documentContent} />
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
