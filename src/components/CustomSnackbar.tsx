import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { removeSnackbar } from '@/slices/snackbar.slice';
import { getSnackbar } from '@/selectors/snackbar.selector';

const CustomSnackbar = () => {
	let dispatch = useDispatch();
	const { state, type, message } = useSelector(getSnackbar);
	const Alert = forwardRef(function Alert(props: any, ref: any) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	const onClose = () => {
		dispatch(removeSnackbar(false));
	};
	return (
		<Snackbar open={state} autoHideDuration={2000} onClose={onClose}>
			<Alert severity={type} sx={{ width: '100%' }} onClose={onClose}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default CustomSnackbar;
