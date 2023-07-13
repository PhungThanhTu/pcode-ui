import { Alert, Box, CircularProgress, Divider, Link, TextField, Typography } from '@mui/material';
import AuthFormLayout from '../layouts/AuthFormLayout';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, getReset } from '../selectors/auth.selector';
import { login } from '@/slices/auth.slice';
import { CustomButton } from '@/components/Custom/CustomButton';
import { Link as RouterLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ResetPasswordRequest } from '@/types/auth.type';
import { resetPassword, resetPasswordError, resetPasswordSuccess, resetState } from '@/slices/reset.slice';

export const ResetForm = () => {

    const [params] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url = params.get('token')

    // const { URLtoken } = params

    const { loading, error, success } = useSelector(getReset);

    const [userCred, setUserCred] = useState({
        token: url ? url : "",
        password: ''
    });
    const [repass, setrepass] = useState('')
    const { token, password } = userCred
    const rep = repass

    const onReset = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if(rep !== password) {
            dispatch(resetPasswordError('Password must the same with Re-Password'))
        }
        else{
            const resetForm: ResetPasswordRequest = {
                token: userCred.token,
                password: userCred.password
            };
            dispatch(resetPassword(resetForm));
        }
   
    };


    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setUserCred({
            ...userCred,
            [e.target.name]: e.target.value
        })

    };
    const onChange2 = async (e: ChangeEvent<HTMLInputElement>) => {
        setrepass(
            e.target.value
        )

    };

    useEffect(() => {
        if (success) {

            setTimeout(() => {
                dispatch(resetState())
                navigate('/login');

            }, 2000);
        }
    }, [success, error]);

    return (
        <AuthFormLayout>
            <Box component="form" sx={{ width: '100%', padding: '20px' }} onSubmit={onReset}>
                <Box sx={{ paddingBottom: '20px' }}>
                    <Typography variant="h4" textAlign="center">Reset Your Password</Typography>
                </Box>
                {/* <Box sx={{ paddingBottom: '10px', paddingTop: '10px', width: 1, display: 'grid' }}>
                    <TextField label="Reset Token" name="token" value={token} required onChange={onChange} type="text" />
                </Box> */}
                <Box sx={{ paddingBottom: '35px', width: 1, display: 'grid' }}>
                    <TextField label="Password" name="password" value={password} required onChange={onChange} type="password" />
                </Box>
                <Box sx={{ paddingBottom: '35px', width: 1, display: 'grid' }}>
                    <TextField label="Re-Password" name="repassword" value={rep} required onChange={onChange2} type="password" />
                </Box>
                {error ? (
                    <Alert severity='error'>
                        {error}
                    </Alert>

                ) : success ?
                    <Alert severity='success'>
                        Reset successfully
                    </Alert>
                    : (
                        <Divider variant="middle" style={{ width: '95%' }} />
                    )}
                <Box sx={{ paddingTop: '35px', width: 1, display: 'grid' }}>
                    {loading ? (
                        <Box sx={{ width: 1, display: 'grid', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <CustomButton type="submit" content="Reset" />
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
                <Box>
                    <Typography fontSize={16} display="inline-block" marginRight="5px">Don't have account? </Typography>
                    <Link component={RouterLink} to="/register" underline="always" variant="h4" fontSize={16}>
                        Create one
                    </Link>
                </Box>
            </Box>
        </AuthFormLayout>
    );
};
