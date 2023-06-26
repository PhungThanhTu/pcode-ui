import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { GetDocumentByIdResponse } from '@/types/document.type';
import { Fragment, useState, useEffect, useRef, ChangeEvent } from 'react';
import { borderRadius, centerPos, componentStyle, componentsBoxColor } from '@/style/Variables';
import { CustomButton } from '@/components/Custom/CustomButton';
import { CustomEditInput } from '@/components/Custom/CustomEditInput';

import MyPDFViewer from '@/components/MyPDFViewer';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { cancelButton } from '@/style/ButtonSx';
import { LinearLoading } from '@/components/Loading';
import { contentTypeId } from '@/config';
import DocumentTabLayout from '@/layouts/DocumentTabLayout';
import { getContentTypes } from '@/selectors/config.selector';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContentTypes } from '@/slices/config.slice';
import FileViewer from '@/components/FileViewer';

const BoxContainerSx = {
	height: 'inherit'
};

const BoxRightSx = {
	backgroundColor: `${componentsBoxColor}`,
	height: 'inherit',
	width: '100%',
	borderRadius: borderRadius
};
const BoxLeftSx = {
	border: `1px solid ${componentsBoxColor}`,
	height: 'inherit',
	width: '100%',
	textAlign: 'center',
	borderRadius: borderRadius,
	position: 'relative'
};
const BoxPDFViewSx = {
	overflow: 'auto',
	height: '100%'
};

const BoxSetUpSx = {
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	width: '100%',
	height: '100%',
	rowGap: 2
};
const MarkdownSx = {
	overflow: 'hidden',
	height: '100%',
	width: '100%',
	rowGap: 0.5,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
};

interface EditorProps {
	document: GetDocumentByIdResponse;
	documentContent: any;
	onChange: Function;
	onCreate: Function;
	onReset: Function;
}

const Compose = (props: EditorProps) => {

	const { document, documentContent, onChange, onCreate, onReset } = props;

	const NFC = 'No file chosen';

	const dispatch = useDispatch()
	const contentTypes = useSelector(getContentTypes)

	const [IsSetUp, setIsSetUp] = useState<any>(undefined);
	const [IsFileUploaded, setIsFileUploaded] = useState(NFC);
	const [PreviewFile, setPreviewPdfFile] = useState<any>(null);
	const [Type, setType] = useState(0);
	const [MarkdownValue, setMarkdownValue] = useState('');
	const fileRef = useRef<HTMLInputElement>(null);

	const handleChange = (event: SelectChangeEvent) => {
		setType(Number(event.target.value));
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

	const onMarkdownChange = (value: string) => {
		setMarkdownValue(value);
	};

	const onCancelFileChange = () => {
		setPreviewPdfFile(null);
		setIsFileUploaded(NFC);
		if (fileRef.current) {
			fileRef.current.value = '';
		}
	};
	const GetTypeMedata = (type: number) => {
		return contentTypes ? contentTypes.filter(item => item.Id === type)[0].MetaDescription : ""
	}
	useEffect(() => {
		if (documentContent || document.Contents.length > 0) {
			setIsSetUp(true);
			if (document.Contents[0].ContentTypeId === contentTypeId.pdf)
				setType(1);
			else if (document.Contents[0].ContentTypeId === contentTypeId.markDown) {
				setType(0);
				setMarkdownValue(document.Contents[0].ContentBody);
			}
			else {
				setType(2);
			}
		} else {
			setIsSetUp(false);
			setType(1);
		}
	}, [document, documentContent]);

	useEffect(() => {
		if (contentTypes === null) {
			dispatch(fetchContentTypes())
		}
	}, [])

	return (
		<Fragment>
			{
				IsSetUp === undefined ?
					<LinearLoading />
					: !IsSetUp ?
						<Box sx={{ ...BoxSetUpSx, ...componentStyle }}>
							<Typography variant="subtitle1">Decide a type</Typography>
							<Box sx={{ width: '40%' }}>
								<FormControl fullWidth>
									<Select value={contentTypes && contentTypes.length > 0 ? Type.toString() : ''} onChange={handleChange}>
										{
											contentTypes ?
												contentTypes.length > 0 ?
													contentTypes.map((item, index) => {
														return <MenuItem key={index} value={item.Id}>{item.MetaDescription}</MenuItem>
													})
													: " "
												:
												<MenuItem value={0}>Markdown</MenuItem>
										}

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
								Markdown and PDF can be viewed directly in the broswer, whereas file &#40; &#8804; 10MB &#41; can only be
								downloaded
							</Typography>
						</Box>
						:

						<DocumentTabLayout
							title={
								document.Title
							}
							left={
								Type === 1 ?
									<Box sx={{ height: '100%' }}>
										{PreviewFile ? (
											<MyPDFViewer source={PreviewFile} />
										) : document.Contents.length > 0 ? (
											<Box sx={BoxPDFViewSx}>
												{documentContent ? (
													<MyPDFViewer
														source={PreviewFile ? PreviewFile : documentContent}
													/>
												) : (
													<Typography sx={{ ...centerPos, top: '35%' }} variant="h6">
														No contents to preview.
													</Typography>
												)}
											</Box>
										) : (
											<Typography sx={{ ...centerPos, top: '35%' }} variant="h6">
												No contents to preview.
											</Typography>
										)}
									</Box>
									:

									Type === 2 ?
										PreviewFile ?
											<FileViewer source={PreviewFile} />
											:
											documentContent ?
												<FileViewer source={PreviewFile ? PreviewFile : documentContent} />
												:
												<Typography sx={{ ...centerPos, top: '35%' }} variant="h6">
													No files to download.
												</Typography>
										: null
							}
							right={

								<Box>
									<Stack
										flexDirection="column"
										width="100%"
										height="100%"
										alignItems="center"
										justifyContent="center"
										rowGap={2}
									>
										<Fragment>
											<Typography variant="subtitle1">Type : {GetTypeMedata(Type)}</Typography>
											<Stack rowGap={2}>
												<CustomButton
													sx={{ width: '100%' }}
													content="Upload"
													onClick={uploadFile}
												/>
												<CustomButton sx={cancelButton} content="Reset" onClick={onReset} />
											</Stack>
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
											<Box>
												<CustomEditInput
													isNotDisplay={true}
													label=""
													value={''}
													onChange={() => { }}
													onCancel={onCancelFileChange}
													onSave={() => {
														onCreate(Type, PreviewFile);
														setIsFileUploaded(NFC);
														if (fileRef.current) {
															fileRef.current.value = '';
														}
													}}
													isAvatarChange={IsFileUploaded.length > 0 && IsFileUploaded != NFC}
												/>
											</Box>

											<Typography variant="subtitle1" width="40%" textAlign="center">
												Markdown and PDF can be viewed directly in the broswer, whereas file  &#40; &#8804; 10MB &#41; can
												only be downloaded
											</Typography>
										</Fragment>
									</Stack>
								</Box>


							}
							content={
								Type === 0 ?

									<Box sx={{ ...MarkdownSx, ...componentStyle, padding: 0, borderRadius: 0 }}>
										<Box sx={{
											width: '100%',
											height: '100%',
											overflow: 'auto',
											'.md-editor': {
												height: '100%'
											},
											borderRadius: 0
										}}>
											<MarkdownEditor
												width="100%"
												height='inherit'
												visible

												value={MarkdownValue ? MarkdownValue : ''}
												onChange={(value, viewUpdate) => {
													onMarkdownChange(value);
												}}
											/>
										</Box>
										<Stack flexDirection="row" width="30%" height='7%' columnGap={1} paddingBottom={'5px'}>
											<CustomButton sx={cancelButton} content="Reset" onClick={onReset} />
											<CustomButton
												sx={{ width: '100%' }}
												content="Save"
												onClick={() => {
													onCreate(Type, MarkdownValue);
												}}
											/>
										</Stack>
									</Box>

									: null
							}
						>
						</DocumentTabLayout>
			}
		</Fragment>
	);
};

export default Compose;
