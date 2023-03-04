import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				height: '100vh',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default Loading;
