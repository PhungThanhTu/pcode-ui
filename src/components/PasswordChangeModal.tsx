import React, { ChangeEvent, ReactElement, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Alert, AlertTitle } from '@mui/material';
import { Button } from '@mui/material';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	p: 4
};
const PasswordChangeModal = (props: any) => {
	const initialForm = {
		password: '',
		newPassword: '',
		reNewPassword: ''
	};
	const [alert, setAlert] = React.useState<ReactElement>();
	const [passwordForm, setPasswordForm] = React.useState(initialForm);
	const { password, newPassword, reNewPassword } = passwordForm;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPasswordForm({
			...passwordForm,
			[e.target.name]: e.target.value
		});
	};
	const validation = () => {
		if (newPassword == '' || password == '' || reNewPassword == '') {
			setAlert(
				<Alert severity="error">
					<AlertTitle>Error</AlertTitle>
					Missing field — <strong>please fill all fields!</strong>
				</Alert>
			);
			return false;
		} else if (newPassword !== reNewPassword) {
			setAlert(
				<Alert severity="error">
					<AlertTitle>Error</AlertTitle>
					Re-New password differ to New password — <strong>check it out!</strong>
				</Alert>
			);
			return false;
		}
		return true;
	};
	useEffect(() => {
		let timer = setTimeout(() => {
			setAlert(undefined);
		}, 2000);
		return () => {
			clearTimeout(timer);
		};
	}, [alert]);
	useEffect(() => {
		setPasswordForm(initialForm);
	}, []);
	return (
		<Modal open={props.open} onClose={props.onClose}>
			<Box sx={style}>
				<Typography variant="h4" component="h2">
					Change your password
				</Typography>
				<Stack direction="column" spacing={2} height="100%" alignItems="center" justifyContent="center">
					<TextField
						name="password"
						label="Current password"
						type="password"
						fullWidth
						variant="standard"
						onChange={onChange}
					/>
					<TextField
						name="newPassword"
						label="New password"
						type="password"
						fullWidth
						variant="standard"
						onChange={onChange}
					/>
					<TextField
						name="reNewPassword"
						label="Re-New password"
						type="password"
						fullWidth
						variant="standard"
						onChange={onChange}
					/>
					{alert}
					<Stack direction="row" spacing={2} height="100%" alignItems="center" justifyContent="center">
						<Button
							fullWidth
							variant="contained"
							onClick={() => {
								const check = validation();
								if (check) {
									props.onSave(passwordForm);
								}
							}}
						>
							Save
						</Button>
						<Button fullWidth onClick={props.onClose}>
							Cancel
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
};

PasswordChangeModal.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	onSave: PropTypes.func
};

export default PasswordChangeModal;
