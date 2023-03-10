import { Box, Divider, Link, TextField, Typography, CircularProgress, Stack } from '@mui/material';
import AuthFormLayout from '../layouts/AuthFormLayout';
import { ChangeEvent, useEffect, useState } from 'react';
import { CustomButton } from './CustomButton';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestRegister } from '../slices/register.slice';
import { getRegister } from '../selectors/register.selector';
export const RegisterForm = () => {
	const dispatch = useDispatch();

	const { loading, success, error } = useSelector(getRegister);

	const initialRegisterState = {
		username: '',
		password: '',
		rePassword: '',
		fullName: '',
		email: ''
	};

	useEffect(() => {
		if (success) {
			setMetaRegister({
				status: 'success',
				message: 'Registered successfully'
			});
		}
		if (error) {
			setMetaRegister({
				status: 'error',
				message: 'Registered failed'
			});
		}
	}, [success, error]);

	function isValidEmail(email: string) {
		return /\S+@\S+\.\S+/.test(email);
	}

	const [registerState, setRegisterState] = useState(initialRegisterState);
	const [registerError, setRegisterError] = useState({
		username: 'Username is required',
		password: 'Password is required',
		rePassword: 'Please re enter password',
		fullName: 'Full name is required',
		email: 'Email is required'
	});

	const [metaRegister, setMetaRegister] = useState({
		status: '',
		message: ''
	});

	const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const username = e.target.value;
		const tempRegisterState = { ...registerState };
		tempRegisterState.username = username;

		if (!username) {
			const tempRegisterError = { ...registerError };
			tempRegisterError.username = 'Username is required';
			setRegisterError(tempRegisterError);
		} else {
			const tempRegisterError = { ...registerError };
			tempRegisterError.username = '';
			setRegisterError(tempRegisterError);
		}

		setRegisterState(tempRegisterState);
	};

	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		const password = e.target.value;
		const tempRegisterState = { ...registerState };
		tempRegisterState.password = password;
		if (!password) {
			const tempRegisterError = { ...registerError };
			tempRegisterError.password = 'Password is required';
			setRegisterError(tempRegisterError);
		} else {
			const tempRegisterError = { ...registerError };
			tempRegisterError.password = '';
			setRegisterError(tempRegisterError);
		}

		setRegisterState(tempRegisterState);
	};

	const onRePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		const rePassword = e.target.value;
		const tempRegisterState = { ...registerState };
		tempRegisterState.rePassword = rePassword;
		setRegisterState(tempRegisterState);
		if (!rePassword) {
			const tempRegisterError = { ...registerError };
			tempRegisterError.rePassword = 'Please re enter password';
			setRegisterError(tempRegisterError);
			return;
		}

		if (rePassword !== registerState.password) {
			const tempRegisterError = { ...registerError };
			tempRegisterError.rePassword = 'Password does not match';
			setRegisterError(tempRegisterError);
			return;
		}
		const tempRegisterError = { ...registerError };
		tempRegisterError.rePassword = '';
		setRegisterError(tempRegisterError);
	};

	const onFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fullName = e.target.value;
		const tempRegisterState = { ...registerState };
		tempRegisterState.fullName = fullName;

		if (!fullName) {
			const tempRegisterError = { ...registerError };
			tempRegisterError.username = 'Full name is required';
			setRegisterError(tempRegisterError);
		} else {
			const tempRegisterError = { ...registerError };
			tempRegisterError.fullName = '';
			setRegisterError(tempRegisterError);
		}

		setRegisterState(tempRegisterState);
	};

	const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		const email = e.target.value;
		const tempRegisterState = { ...registerState };
		tempRegisterState.email = email;
		setRegisterState(tempRegisterState);

		if (!email) {
			const tempRegisterError = { ...registerError };
			tempRegisterError.email = 'Email is required';
			setRegisterError(tempRegisterError);
			return;
		}
		if (!isValidEmail(email)) {
			const tempRegisterError = { ...registerError };
			tempRegisterError.email = 'Email must be valid';
			setRegisterError(tempRegisterError);
			return;
		}
		const tempRegisterError = { ...registerError };
		tempRegisterError.email = '';
		setRegisterError(tempRegisterError);
	};

	const onRegister = (e: ChangeEvent<HTMLButtonElement>) => {
		const hasNoError =
			registerError.email === '' &&
			registerError.fullName === '' &&
			registerError.rePassword === '' &&
			registerError.password === '' &&
			registerError.username === '';

		if (!hasNoError) {
			const invalidValue = 'Please enter valid value on all required field';
			setMetaRegister({
				status: 'error',
				message: invalidValue
			});
		} else {
			dispatch(
				requestRegister({
					username: registerState.username,
					password: registerState.password,
					fullName: registerState.fullName,
					email: registerState.email
				})
			);
		}
	};

	return (
		<AuthFormLayout>
			<Stack width="100%" direction="column" alignItems="center" justifyContent="center" padding="20px 14px 5px">
				<Box sx={{ paddingBottom: '20px' }}>
					<Typography variant="h4"> Create an account</Typography>
				</Box>
				<Box sx={{ paddingBottom: '5px', paddingTop: '5px', width: 1, display: 'grid' }}>
					<TextField
						onChange={onUsernameChange}
						required
						label="Username"
						aria-label="username"
						value={registerState.username}
						helperText={registerError.username}
						type="text"
						error={registerError.username !== ''}
					/>
				</Box>
				<Box sx={{ paddingBottom: '5px', paddingTop: '5px', width: 1, display: 'grid' }}>
					<TextField
						required
						label="Password"
						aria-label="password"
						value={registerState.password}
						helperText={registerError.password}
						error={registerError.password !== ''}
						onChange={onPasswordChange}
						type="password"
					/>
				</Box>
				<Box sx={{ paddingBottom: '5px', paddingTop: '5px', width: 1, display: 'grid' }}>
					<TextField
						required
						label="Retype password"
						aria-label="rePassword"
						value={registerState.rePassword}
						error={registerError.rePassword !== ''}
						helperText={registerError.rePassword}
						onChange={onRePasswordChange}
						type="password"
					/>
				</Box>
				<Box sx={{ paddingBottom: '5px', paddingTop: '5px', width: 1, display: 'grid' }}>
					<TextField
						required
						label="Full Name"
						aria-label="fullName"
						onChange={onFullNameChange}
						value={registerState.fullName}
						error={registerError.fullName !== ''}
						helperText={registerError.fullName}
						type="text"
					/>
				</Box>
				<Box sx={{ paddingBottom: '15px', paddingTop: '5px', width: 1, display: 'grid' }}>
					<TextField
						required
						label="Email"
						aria-label="email"
						onChange={onEmailChange}
						value={registerState.email}
						type="email"
						error={registerError.email !== ''}
						helperText={registerError.email}
					/>
				</Box>
				{metaRegister.status === 'error' ? (
					<Typography variant="h4" fontSize={14} color="red">
						{metaRegister.message}
					</Typography>
				) : metaRegister.status === 'success' ? (
					<Typography variant="h4" fontSize={14} color="blue">
						{metaRegister.message}
					</Typography>
				) : (
					<Divider variant="middle" style={{ width: '95%' }} />
				)}

				<Box sx={{ paddingBottom: '30px', paddingTop: '15px', width: 1, display: 'grid' }}>
					{loading ? (
						<Box sx={{ width: 1, display: 'grid', justifyContent: 'center' }}>
							<CircularProgress />
						</Box>
					) : (
						<CustomButton content="Create account" onClick={onRegister} />
					)}
				</Box>
				<Typography fontSize={16}>Already have an account</Typography>
				<Link component={RouterLink} to="/login" underline="none" variant="h4" fontSize={16}>
					Login
				</Link>
			</Stack>
		</AuthFormLayout>
	);
};
