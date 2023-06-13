import { Box, CircularProgress, Divider, Link, TextField, Typography } from '@mui/material';
import AuthFormLayout from '../layouts/AuthFormLayout';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../selectors/auth.selector';
import { login } from '@/slices/auth.slice';
import { CustomButton } from '@/components/Custom/CustomButton';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, error, profile }: any = useSelector(getAuth);

	const [userCred, setUserCred] = useState({
		username: '',
		password: ''
	});

	useEffect(() => {
		if (profile) navigate('/', { replace: true });
	}, [navigate, profile]);

	const onLogin = async (e: ChangeEvent<HTMLButtonElement>) => {
		const credentials = {
			username: userCred.username,
			password: userCred.password
		};
		dispatch(login(credentials));
	};

	const onUsernameChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const tempUserCred = { ...userCred };
		tempUserCred.username = e.target.value;
		setUserCred(tempUserCred);
	};

	const onPasswordChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const tempUserCred = { ...userCred };
		tempUserCred.password = e.target.value;
		setUserCred(tempUserCred);
	};

	return (
		<AuthFormLayout>
			<Box component="form" sx={{ width: '100%', padding: '20px' }}>
				<Box sx={{ paddingBottom: '20px' }}>
					<Typography variant="h4"> Sign in</Typography>
				</Box>
				<Box sx={{ paddingBottom: '10px', paddingTop: '10px', width: 1, display: 'grid' }}>
					<TextField label="Username" aria-label="username" onChange={onUsernameChange} type="text" />
				</Box>
				<Box sx={{ paddingBottom: '35px', width: 1, display: 'grid' }}>
					<TextField label="Password" aria-label="password" onChange={onPasswordChange} type="password" />
				</Box>
				{error ? (
					<Typography variant="h4" fontSize={14} color="red">
						{error}
					</Typography>
				) : (
					<Divider variant="middle" style={{ width: '95%' }} />
				)}
				<Box sx={{ paddingTop: '35px', width: 1, display: 'grid' }}>
					{loading ? (
						<Box sx={{ width: 1, display: 'grid', justifyContent: 'center' }}>
							<CircularProgress />
						</Box>
					) : (
						<CustomButton type="submit" content="Login" onClick={onLogin} />
					)}
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					paddingTop: '25px'
				}}
			>
				<Typography fontSize={16}>Don't have account</Typography>
				<Link component={RouterLink} to="/register" underline="none" variant="h4" fontSize={16}>
					Create one
				</Link>
			</Box>
		</AuthFormLayout>
	);
};
