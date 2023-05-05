import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';

import { GetDocumentByIdResponse } from '@/types/document.type';
import { Fragment, useState, useEffect, useRef } from 'react';
import { borderColor } from '@/style/Variables';
import { CustomButton } from '@/components/Custom/CustomButton';
import { BoxPDFView } from '@/style/BoxModalSx';

interface EditorProps {
	document: GetDocumentByIdResponse;
	documentContent: any;
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
	const { document, documentContent } = props;

	const [isSetUp, setIsSetUp] = useState(false);
	const [type, setType] = useState('PDF');
	const fileRef = useRef<HTMLInputElement>(null);

	const handleChange = (event: SelectChangeEvent) => {
		setType(event.target.value as string);
	};

	const uploadFile = () => {
		if (fileRef.current) {
			fileRef.current.click();
		}
	};

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
							{!isSetUp ? (
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
									<input id="fileUpload" name="file" type="file" hidden ref={fileRef} />
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
								<Viewer
									defaultScale={SpecialZoomLevel.PageFit}
									fileUrl={URL.createObjectURL(documentContent)}
								/>
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
