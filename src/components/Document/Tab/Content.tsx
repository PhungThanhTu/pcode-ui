import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MyPDFViewer from '@/components/MyPDFViewer';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { BoxNotFoundSx } from '@/style/BoxSx';
import { centerPos, componentStyle } from '@/style/Variables';
import DocumentTabLayout from '@/layouts/DocumentTabLayout';
import { contentTypeId } from '@/config';
import FileViewer from '@/components/FileViewer';

const BoxViewSx = {
	height: ' inherit',
	width: '100%',
};

export interface PreviewProps {
	source: any;
	type: number;
	title?: string;
}

const Content = (props: PreviewProps) => {
	const { source, type, title } = props;

	if (source) {
		if (type === contentTypeId.pdf)
			return (
				<DocumentTabLayout
					title={title}
					content={
						<Box sx={{ ...BoxViewSx, ...componentStyle }}>
							<MyPDFViewer source={source} />
						</Box>
					}
				/>
			);
		else if (type === contentTypeId.markDown)
			return (
				<DocumentTabLayout
					title={title}
					content={
						<Box sx={{ ...BoxViewSx, ...componentStyle, padding: '5px' }}>
							<MarkdownPreview
								source={source}
								style={{ height: 'fit-content', overflow: 'auto' }}
							/>
						</Box>
					}
				/>
			);
		else {
			return (
				<DocumentTabLayout
					title={title}
					content={
						<Box sx={{ ...BoxViewSx, ...componentStyle, padding: '5px' }}>
							<FileViewer  source={source}/>
						</Box>
					}
				/>
			)
		}
	} else {
		return (
			<Box sx={BoxNotFoundSx}>
				<Typography sx={{ ...centerPos, width: 'fit-content' }} variant="h5">
					No pdf/markdown to view.
				</Typography>
			</Box>
		);
	}
};

export default Content;
