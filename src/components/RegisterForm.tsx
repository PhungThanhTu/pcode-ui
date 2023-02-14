import { Box, Divider, Link, TextField, Typography } from '@mui/material';
import AuthFormLayout from '../layouts/AuthFormLayout';
import { ChangeEvent, useRef } from 'react';
import { CustomButton } from './CustomButton';

export const RegisterForm = () => {
	const usernameField = useRef<HTMLInputElement>(null);
	const passwordField = useRef<HTMLInputElement>(null);
	const rePasswordField = useRef<HTMLInputElement>(null);
	const fullNameField = useRef<HTMLInputElement>(null);
	const emailField = useRef<HTMLInputElement>(null);

	const onRegister = (e: ChangeEvent<HTMLButtonElement>) => {
		const username = usernameField.current?.value;
		const password = passwordField.current?.value;
		const rePassword = rePasswordField.current?.value;
		const fullName = fullNameField.current?.value;
		const email = emailField.current?.value;

		console.log(usernameField);

		console.log({
			username,
			password,
			rePassword,
			fullName,
			email
		});
	};

	return (
		<AuthFormLayout>
			<Box sx={{ paddingBottom: '20px' }}>
				<Typography variant="h4"> Create an account</Typography>
			</Box>
			<Box sx={{ paddingBottom: '10px', paddingTop: '10px', width: 1, display: 'grid' }}>
				<TextField label="Username" aria-label="username" inputRef={usernameField} type="text" />
			</Box>
			<Box sx={{ paddingBottom: '10px', paddingTop: '10px', width: 1, display: 'grid' }}>
				<TextField label="Password" aria-label="password" inputRef={passwordField} type="password" />
			</Box>
			<Box sx={{ paddingBottom: '10px', paddingTop: '10px', width: 1, display: 'grid' }}>
				<TextField label="Retype password" aria-label="rePassword" inputRef={rePasswordField} type="password" />
			</Box>
			<Box sx={{ paddingBottom: '10px', paddingTop: '10px', width: 1, display: 'grid' }}>
				<TextField label="Full Name" aria-label="fullName" inputRef={fullNameField} type="text" />
			</Box>
			<Box sx={{ paddingBottom: '10px', paddingTop: '10px', width: 1, display: 'grid' }}>
				<TextField label="Email" aria-label="email" inputRef={emailField} type="email" />
			</Box>
			<Divider variant="middle" style={{ width: '95%' }} />
			<Box sx={{ paddingBottom: '20px', paddingTop: '10px', width: 1, display: 'grid' }}>
				<CustomButton content="Create account" onClick={onRegister} />
			</Box>
			<Typography fontSize={16}>Already have an account</Typography>
			<Link href="/login" underline="none" variant="h4" fontSize={16}>
				Login
			</Link>
		</AuthFormLayout>
	);
};
