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
	paddingTop: 0,
	minHeight: 'inherit',
	overflowY: 'hidden',
};
const BoxContentSx = {
	overflowX: 'hidden',
	overflowY: 'hidden',

};

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
						// minHeight: `calc(100vh - ${HeaderHeight ? HeaderHeight.offsetHeight : '55'}px)`,
						maxHeight: `100vh`
					}}
				>
					<Box id='AppContentChildren' sx={
						{
							...LayoutBoxSx,
							height: `calc(100vh - ${HeaderHeight ? HeaderHeight.offsetHeight : '55'}px)`
						}}
					>{props.children}</Box>
				</Box>
				<NotificationSnackbar />
				<BackdropLoading />
				{/* <Footer /> */}
			</Box>
		</React.Fragment>
	);
};

export default AppLayout;
