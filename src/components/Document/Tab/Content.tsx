import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MyPDFViewer from '@/components/MyPDFViewer';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { BoxNotFoundSx } from '@/style/BoxSx';

const BoxPDFViewSx = {
	height: '100vh',
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
				<Box sx={BoxPDFViewSx}>
					<MyPDFViewer source={source} />
				</Box>
			);
		else return <MarkdownPreview source={source} />;
	} else {
		return (
			<Box sx={BoxNotFoundSx}>
				<Typography variant="h5">No content/file/markdown to view.</Typography>
			</Box>
		);
	}
};

export default Content;
