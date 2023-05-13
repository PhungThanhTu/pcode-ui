import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import type { ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { BoxNotFoundSx } from '@/style/BoxSx';

const BoxViewerSx = {
	width: '100%',
	overflow: 'hidden',
	height: '100%'
};

const BoxContainerSx = {
	border: '1px solid rgba(0, 0, 0, 0.3)',
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	width: '100%',
	overflow: 'hidden'
};

interface MyPDFViewerProps {
	source: any;
}

const MyPDFViewer = (props: MyPDFViewerProps) => {
	const toolbarPluginInstance = toolbarPlugin();
	const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

	const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
		...slot,
		Open: () => <></>,
		SwitchTheme: () => <></>
	});
	const { source } = props;

	return (
		<Box sx={BoxContainerSx}>
			{source ? (
				<Fragment>
					<Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
					<Box sx={BoxViewerSx}>
						<Viewer
							plugins={[toolbarPluginInstance]}
							fileUrl={URL.createObjectURL(source)}
							// defaultScale={SpecialZoomLevel.PageFit}
						/>
					</Box>
				</Fragment>
			) : (
				<Box sx={BoxNotFoundSx}>
					<Typography variant="h4">No PDF file to view.</Typography>
				</Box>
			)}
		</Box>
	);
};

export default MyPDFViewer;
