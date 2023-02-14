import { Box, SxProps } from '@mui/material';
import React from 'react';

interface PropsWithChildrenOnly {
	children: React.ReactNode;
}

const AuthFormLayout: React.FunctionComponent<PropsWithChildrenOnly> = (props: PropsWithChildrenOnly) => {
	const FormSx: SxProps = {
		backgroundColor: 'rgba(255, 255, 255, 0.99)',
		padding: '25px',
		border: 1,
		borderWidth: '0px',
		borderRadius: '12px',
		width: '30%',
		height: '70%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	};

	return <Box sx={FormSx}>{props.children}</Box>;
};

export default AuthFormLayout;
