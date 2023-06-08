import { Box, SxProps } from '@mui/material';
import React from 'react';

interface PropsWithChildrenOnly {
	children: React.ReactNode;
}

const AuthPageLayout: React.FunctionComponent<PropsWithChildrenOnly> = (props: PropsWithChildrenOnly) => {
	const PageSx: SxProps = {
		background: ` url(${'http://smartourism.vn/uploads/images/service/hinh-dich-vu-1(1).jpg'})`,
		backgroundColor: '#0000000f',
		backgroundBlendMode: 'soft-light',
		width: '100%',
		height: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center'
	};

	return <Box sx={PageSx}>{props.children}</Box>;
};

export default AuthPageLayout;
