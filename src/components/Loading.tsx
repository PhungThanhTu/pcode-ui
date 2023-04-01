import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const LinearLoadingSx = {
	width: '70%',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)'
};

export const LinearLoading = () => {
	return (
		<Box sx={LinearLoadingSx}>
			<LinearProgress />
		</Box>
	);
};
const CircleLoadingSx = {
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
};
export const CircleLoading = () => {
	return (
		<Box sx={CircleLoadingSx}>
			<CircularProgress />
		</Box>
	);
};
const CirclePageLoadingSx = {
	display: 'flex',
	height: '100vh',
	justifyContent: 'center',
	alignItems: 'center'
};

export const CirclePageLoading = () => {
	return (
		<Box sx={CirclePageLoadingSx}>
			<CircularProgress />
		</Box>
	);
};
