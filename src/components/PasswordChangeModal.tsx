import React, { ChangeEvent, ReactElement, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Alert, AlertTitle } from '@mui/material';
import { Button } from '@mui/material';
import { BoxModalSx } from './CreateCourseModal';

export interface PasswordChangeModalProps {
	open: boolean;
	onSave: Function;
	onClose: Function;
}

export interface PasswordChangeFormProps {
	password: string;
	newPassword: string;
	reNewPassword: string;
}

const PasswordChangeModal = ({ open, onSave, onClose }: PasswordChangeModalProps) => {
	const initialForm: PasswordChangeFormProps = {
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
		if (newPassword === '' || password === '' || reNewPassword === '') {
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

	const handleSavePassword = () => {
		const check = validation();
		if (check) {
			onSave(passwordForm);
			onClose();
		}
	};

	useEffect(() => {
		let timer = setTimeout(() => {
			setAlert(undefined);
		}, 2000);
		return () => {
			clearTimeout(timer);
		};
	}, [alert]);

	return (
		<Modal onClose={() => onClose()} open={open}>
			<Box sx={BoxModalSx}>
				<Typography variant="h5" component="h2">
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
					<Stack
						direction="row"
						spacing={1}
						height="100%"
						width="100%"
						alignItems="center"
						justifyContent="flex-end"
						paddingTop="25px"
					>
						<Button variant="contained" onClick={() => handleSavePassword()}>
							Save
						</Button>
						<Button onClick={() => onClose()}>Cancel</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
};

export default PasswordChangeModal;
