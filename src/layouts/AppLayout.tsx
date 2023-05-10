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
	padding: '15px'
};
const DivStyle = {
	marginTop: '50px',
	minHeight: '100vh',
	maxHeight: 'fit-content'
};
const AppLayout: React.FunctionComponent<PropsWithChildrenOnly> = (props: PropsWithChildrenOnly) => {
	return (
		<React.Fragment>
			<NavBar />
			<div style={DivStyle}>
				<Box sx={LayoutBoxSx}>{props.children}</Box>
			</div>
			<NotificationSnackbar />
			<BackdropLoading />
			<Footer />
		</React.Fragment>
	);
};

export default AppLayout;
