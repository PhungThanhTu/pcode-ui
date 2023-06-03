import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MyPDFViewer from '@/components/MyPDFViewer';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { BoxNotFoundSx } from '@/style/BoxSx';
import { centerPos, componentStyle } from '@/style/Variables';
import DocumentTabLayout from '@/layouts/DocumentTabLayout';
import { contentTypeId } from '@/config';

const BoxViewSx = {
	minHeight: '80vh',
	maxHeight: '100vh',
	width: '100%',
	overflow: 'auto'
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
		else
			return (
				<DocumentTabLayout
					title={title}
					content={
						<Box sx={{ ...BoxViewSx, ...componentStyle }}>
							<MarkdownPreview
								source={source}
								style={{ minHeight: 'inherit', maxHeight: '700px', overflow: 'scroll' }}
							/>
						</Box>
					}
				/>
			);
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
