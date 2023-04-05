import NavBar from '../components/NavBar';
import React from 'react';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import CustomSnackbar from '@/components/CustomSnackbar';
import { BackdropLoading } from '@/components/Loading';

interface PropsWithChildrenOnly {
	children: React.ReactNode;
}
const LayoutBoxSx = {
	width: '100%',
	padding: '30px'
};
const Layout: React.FunctionComponent<PropsWithChildrenOnly> = (props: PropsWithChildrenOnly) => {
	return (
		<React.Fragment>
			<NavBar />
			<div style={{ marginTop: '70px', height: '100vh' }}>
				<Box sx={LayoutBoxSx}>{props.children}</Box>
			</div>
			<Footer />
			<CustomSnackbar />
			<BackdropLoading />
		</React.Fragment>
	);
};

export default Layout;
