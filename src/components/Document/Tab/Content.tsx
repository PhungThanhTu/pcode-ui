import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MyPDFViewer from '@/components/MyPDFViewer';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { BoxNotFoundSx } from '@/style/BoxSx';
import { componentStyle } from '@/style/Variables';

const BoxViewSx = {
	minHeight: '100vh',
	width: '100%'
};

interface PreviewProps {
	source: any;
	type: number;
}

const Content = (props: PreviewProps) => {
	const { source, type } = props;

	if (source) {
		if (type === 2)
			return (
				<Box sx={{ ...BoxViewSx, ...componentStyle }}>
					<MyPDFViewer source={source} />
				</Box>
			);
		else
			return (
				<Box sx={{ ...BoxViewSx, ...componentStyle }}>
					<MarkdownPreview source={source} />
				</Box>
			);
	} else {
		return (
			<Box sx={BoxNotFoundSx}>
				<Typography variant="h5">No content/file/markdown to view.</Typography>
			</Box>
		);
	}
};

export default Content;
