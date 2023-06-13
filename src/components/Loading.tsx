import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { useSelector } from 'react-redux';
import { getLoading } from '@/selectors/loading.selector';
import { borderRadius } from '@/style/Variables';

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
	alignItems: 'center',
	height: '100%'
};
export const CircleLoading = () => {
	return (
		<Box sx={CircleLoadingSx}>
			<CircularProgress />
		</Box>
	);
};
const BackdropLoadingContainerSx = {
	width: '100%',
	height: '100%',
	zIndex: '1301',
	position: 'fixed',
	right: '0',
	bottom: '0',
	top: '0',
	left: '0'
};
const BackdropLoadingSx = {
	color: '#fff',
	zIndex: '1302',
	right: '45%',
	bottom: '45%',
	top: '45%',
	left: '45%',
	borderRadius: borderRadius
};
export const BackdropLoading = () => {
	const { isLoading } = useSelector(getLoading);
	return (
		<Box sx={BackdropLoadingContainerSx} display={isLoading ? 'block' : 'none'}>
			<Backdrop sx={BackdropLoadingSx} open={isLoading}>
				<CircularProgress color="inherit" />
			</Backdrop>
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
