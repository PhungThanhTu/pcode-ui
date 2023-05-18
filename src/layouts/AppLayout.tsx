import NavBar from '../components/NavBar';
import React from 'react';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import NotificationSnackbar from '@/components/Custom/CustomSnackbar';

import { BackdropLoading } from '@/components/Loading';

interface PropsWithChildrenOnly {
	children: React.ReactNode;
}
const LayoutBoxSx = {
	width: '100%',
	padding: '15px',
	paddingTop: 0
};
const BoxContentSx = {
	overflowX: 'hidden',
	height: '100%'
};
const BoxContainerSx = {};

const AppLayout: React.FunctionComponent<PropsWithChildrenOnly> = (props: PropsWithChildrenOnly) => {
	const HeaderHeight = document.getElementsByTagName('header')[0];

	return (
		<React.Fragment>
			<Box id="AppContainer">
				<NavBar />
				<Box
					id="AppContent"
					sx={{
						...BoxContentSx,
						paddingTop: `${HeaderHeight ? HeaderHeight.offsetHeight : '55'}px`,
						minHeight: `calc(100vh - ${HeaderHeight ? HeaderHeight.offsetHeight : '55'}px)`
						// maxHeight: `calc(100vh - ${HeaderHeight ? HeaderHeight.offsetHeight : '55'}px)`
					}}
				>
					<Box sx={LayoutBoxSx}>{props.children}</Box>
				</Box>
				<NotificationSnackbar />
				<BackdropLoading />
				<Footer />
			</Box>
		</React.Fragment>
	);
};

export default AppLayout;
