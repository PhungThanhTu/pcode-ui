import NavBar from '../components/NavBar';
import React from 'react';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';

interface PropsWithChildrenOnly {
	children: React.ReactNode;
}

const Layout: React.FunctionComponent<PropsWithChildrenOnly> = (props: PropsWithChildrenOnly) => {
	const LayoutBoxSx = {
		width: '100%',
		padding: '30px'
	}
	return (
		<React.Fragment>
			<NavBar />
			<div style={{ marginTop: '70px', height: '100vh' }}>
				<Box sx={LayoutBoxSx }>
					{props.children}
				</Box>
			</div>
			<Footer />
		</React.Fragment>
	);
};

export default Layout;
