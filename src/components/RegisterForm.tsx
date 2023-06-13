import { Box, Divider, Link, TextField, Typography, CircularProgress, Stack } from '@mui/material';

import AuthFormLayout from '../layouts/AuthFormLayout';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { CustomButton } from '@/components/Custom/CustomButton';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestRegister } from '../slices/register.slice';
import { getRegister } from '../selectors/register.selector';
import { ValidEmail } from '@/utils/regex';
import { Primary } from '@/style/Colors';

const BoxFieldSx = {
	marginBottom: '5px',
	marginTop: '5px',
	width: '100%'
};
const BoxFormSx = {
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '5px 10px'
};
export const RegisterForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { loading, success, error } = useSelector(getRegister);

	const initialRegisterState = {
		username: '',
		password: '',
		rePassword: '',
		fullName: '',
		email: ''
	};

	function isValidEmail(email: string) {
		return ValidEmail.test(email);
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

	const onRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

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

	useEffect(() => {
		if (success) {
			setMetaRegister({
				status: 'success',
				message: 'Registered successfully'
			});
			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} else if (error) {
			setMetaRegister({
				status: 'error',
				message: 'Registered failed'
			});
		}
	}, [success, error]);

	return (
		<AuthFormLayout>
			<Box
				sx={BoxFormSx}
				component="form"
				onSubmit={(e) => {
					onRegister(e);
				}}
			>
				<Box sx={{ marginBottom: '20px' }}>
					<Typography variant="h4">Create an account</Typography>
				</Box>
				<Box sx={BoxFieldSx}>
					<TextField
						fullWidth
						onChange={onUsernameChange}
						required
						label="Username"
						aria-label="username"
						value={registerState.username}
						type="text"
					/>
				</Box>
				<Box sx={BoxFieldSx}>
					<TextField
						fullWidth
						required
						label="Password"
						aria-label="password"
						value={registerState.password}
						onChange={onPasswordChange}
						type="password"
					/>
				</Box>
				<Box sx={BoxFieldSx}>
					<TextField
						fullWidth
						required
						label="Retype password"
						aria-label="rePassword"
						value={registerState.rePassword}
						onChange={onRePasswordChange}
						type="password"
					/>
				</Box>
				<Box sx={BoxFieldSx}>
					<TextField
						fullWidth
						required
						label="Full Name"
						aria-label="fullName"
						onChange={onFullNameChange}
						value={registerState.fullName}
						type="text"
					/>
				</Box>
				<Box sx={{ ...BoxFieldSx, marginBottom: '15px' }}>
					<TextField
						fullWidth
						required
						label="Email"
						aria-label="email"
						onChange={onEmailChange}
						value={registerState.email}
						type="email"
					/>
				</Box>
				{metaRegister.status === 'error' ? (
					<Typography variant="h4" fontSize={14} color="red">
						{metaRegister.message}
					</Typography>
				) : metaRegister.status === 'success' ? (
					<Typography variant="h4" fontSize={14} color={`${Primary['main']}`}>
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
						<CustomButton type="submit" content="Create account" />
					)}
				</Box>
				<Typography fontSize={16}>Already have an account</Typography>
				<Link component={RouterLink} to="/login" underline="none" variant="h4" fontSize={16}>
					Login
				</Link>
			</Box>
		</AuthFormLayout>
	);
};
