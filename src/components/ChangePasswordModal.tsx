import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from 'react';
import { BoxModalSx } from '@/style/BoxSx';

interface ChangePasswordModalProps {
	open: boolean;
	onSave: Function;
	onClose: Function;
}

interface ChangePasswordFormProps {
	password: string;
	newPassword: string;
	reNewPassword: string;
}

const ChangePasswordModal = ({ open, onSave, onClose }: ChangePasswordModalProps) => {
	const initialForm: ChangePasswordFormProps = {
		password: '',
		newPassword: '',
		reNewPassword: ''
	};
	const [alert, setAlert] = useState<ReactElement>();
	const [passwordForm, setPasswordForm] = useState(initialForm);
	const { password, newPassword, reNewPassword } = passwordForm;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPasswordForm({
			...passwordForm,
			[e.target.name]: e.target.value
		});
	};
	const validation = () => {
		if (newPassword !== reNewPassword) {
			setAlert(
				<Alert severity="error">
					<AlertTitle>Error</AlertTitle>
					Re-New password differs to New password — <strong>check it out!</strong>
				</Alert>
			);
			return false;
		} else if (password === newPassword) {
			setAlert(
				<Alert severity="error">
					<AlertTitle>Error</AlertTitle>
					New password can not be the same with Current password — <strong>check it out!</strong>
				</Alert>
			);
			return false
		}
		return true;
	};

	const handleSavePassword = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const check = validation();
		if (check) {
			onSave(passwordForm);
			onClose();
		}
	};

	useEffect(() => {
		let timer = setTimeout(() => {
			setAlert(undefined);
		}, 4000);
		return () => {
			clearTimeout(timer);
		};
	}, [alert]);

	return (
		<Modal onClose={() => onClose()} open={open} sx={{ width: '50%', margin: 'auto' }}>
			<Box component="form" sx={BoxModalSx} onSubmit={handleSavePassword}>
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
						required
					/>
					<TextField
						name="newPassword"
						label="New password"
						type="password"
						fullWidth
						variant="standard"
						onChange={onChange}
						required
					/>
					<TextField
						name="reNewPassword"
						label="Re-New password"
						type="password"
						fullWidth
						variant="standard"
						required
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
						<Button variant="contained" type='submit'>
							Save
						</Button>
						<Button onClick={() => onClose()}>Cancel</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
};

export default ChangePasswordModal;
