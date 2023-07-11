import { Box, SxProps } from '@mui/material';
import React from 'react';

interface PropsWithChildrenOnly {
	children: React.ReactNode;
}

const AuthPageLayout: React.FunctionComponent<PropsWithChildrenOnly> = (props: PropsWithChildrenOnly) => {
	const PageSx: SxProps = {
		background: ` url('${window.location.origin}/background2.png')`,
		 
		// backgroundImage: 'url(https://ponivibe.com/wp-content/uploads/2022/08/xian-dooley-DJ7bWa-Gwks-unsplash-1536x1024.jpg.pagespeed.ic.7NkDLJeuHI.webp)',
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
