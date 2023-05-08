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
import MarkdownEditor from '@uiw/react-markdown-editor';

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

const BoxSetUpSx = {
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	width: '50%',
	height: '100%',
	rowGap: 2
};
const MarkdownSx = {
	width: '100%',
	rowGap: 2,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
};

interface EditorProps {
	document: GetDocumentByIdResponse;
	documentContent: any;
	onChange: Function;
	onCreate: Function;
}

const Editor = (props: EditorProps) => {
	const { document, documentContent, onChange, onCreate } = props;

	const NFC = 'No file chosen';

	const [IsSetUp, setIsSetUp] = useState(false);
	const [IsFileUploaded, setIsFileUploaded] = useState(NFC);
	const [PreviewPdfFile, setPreviewPdfFile] = useState<any>(null);
	const [Type, setType] = useState('PDF');
	const [MarkdownValue, setMarkdownValue] = useState('');
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
		console.log(documentContent, document.Contents, 'hello');
		if (documentContent || document.Contents.length > 0) {
			setIsSetUp(true);
			if (document.Contents[0].ContentTypeId === 2) setType('PDF');
			else {
				setType('Markdown');
				setMarkdownValue(document.Contents[0].ContentBody);
			}
		} else {
			setIsSetUp(false);
			setType('PDF');
		}
	}, [document, documentContent]);

	return (
		<Box sx={BoxContainerSx}>
			<Stack flexDirection="column" rowGap={4} height="100%">
				<Typography variant="h6">{document.Title}</Typography>
				<Stack
					flexDirection="row"
					width="100%"
					height="100%"
					padding="0.75rem"
					alignItems={'flex-start'}
					justifyContent={'center'}
				>
					{IsSetUp ? (
						Type === 'PDF' ? (
							<Fragment>
								<Box sx={BoxLeftSx}>
									<Stack
										flexDirection="column"
										width="100%"
										height="100%"
										alignItems="center"
										justifyContent="flex-start"
										rowGap={3}
									>
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
											<Typography variant="subtitle1" width="40%" textAlign="center">
												Markdown and PDF can be viewed directly in the broswer, whereas file can
												only be downloaded
											</Typography>
										</Fragment>
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
							</Fragment>
						) : (
							<Box sx={MarkdownSx}>
								<CustomButton
									content="Save"
									onClick={() => {
										onCreate(Type, MarkdownValue);
									}}
								/>
								<div data-color-mode="dark" style={{ width: '100%' }}>
									<MarkdownEditor
										width="100%"
										height="100vh"
										visible
										value={MarkdownValue ? MarkdownValue : ''}
										onChange={(value, viewUpdate) => setMarkdownValue(value)}
									/>
								</div>
							</Box>
						)
					) : (
						<Box sx={BoxSetUpSx}>
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
							<Typography variant="subtitle1" width="40%" textAlign="center">
								Markdown and PDF can be viewed directly in the broswer, whereas file can only be
								downloaded
							</Typography>
						</Box>
					)}
				</Stack>
			</Stack>
		</Box>
	);
};

export default Editor;
