import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate, useParams } from 'react-router';

const CourseDialog = () => {
	const { code } = useParams();
	const navigate = useNavigate();

	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
		navigate('/course');
	};

	useEffect(() => {}, [code]);
	return (
		<Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">{'join this location service?'}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">Do you want to join?</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Disagree</Button>
				<Button onClick={handleClose} autoFocus>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CourseDialog;
