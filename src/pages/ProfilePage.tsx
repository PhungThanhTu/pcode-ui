import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tyography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CustomEditInput from '@/components/CustomEditInput';
import PasswordChangeModal from '@/components/PasswordChangeModal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@mui/material/styles/styled';

import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton } from '@/components/CustomButton';
import { getAuth } from '../selectors/auth.selector';
import { PasswordChangeRequest, UserProfile } from '@/types/auth.type';
import { changePassword, updateProfile } from '@/slices/profile.slice';
import { useImageFileReader } from '@/hook/useFileReader';

const Item = styled(Paper)(({ theme }) => ({
	padding: '24px 14px 10px',
	boxShadow: 'none'
}));
const AvatarSx = {
	height: '100%',
	width: '60%',
	fontSize: '100pt'
};
const AvatarHoverSx = {
	height: '100%',
	width: '60%',
	position: 'absolute',
	opacity: 0,
	'z-index': 10,
	'&:hover': {
		opacity: 0.6,
		background: '#ffffffe5',
		transitionProperty: 'opacity',
		transitionDuration: '0.25s',
		transitionTimingFunction: 'ease-in-out',
		transitionDelay: '0s'
	}
};
const AvatarHoverContentSx = {
	height: '50%',
	width: '50%',
	color: '#969696',
	fontSize: '100pt',
	fontWeight: 500,
	cursor: 'pointer',
	'.MuiSvgIcon-root': {
		height: '100%',
		width: '100%'
	}
};
const ProfilePage = () => {
	const dispatch = useDispatch();

	const { profile } = useSelector(getAuth);
	const { B64Value, getImageB64Value } = useImageFileReader();

	const pictureRef = useRef<HTMLInputElement>(null);
	const avatarRef = useRef<HTMLElement>(null);
	const [ProfileForm, setProfileForm] = useState({ ...profile });
	const [OpenPasswordChange, setOpenPasswordChange] = useState(false);
	const [IsAvatarChange, setIsAvatarChange] = useState(false);

	const { fullName, email, avatar } = ProfileForm;

	const uploadPicture = () => {
		if (pictureRef.current) {
			pictureRef.current.click();
		}
	};
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'avatar') {
			getImageB64Value(e);
			setIsAvatarChange(true);
		} else {
			setProfileForm({
				...ProfileForm,
				[e.target.name]: e.target.value
			});
		}
	};
	const onCancel = (name: keyof UserProfile) => {
		if (profile) {
			setProfileForm({
				...ProfileForm,
				[name]: profile[name]
			});
		}
		if (name === 'avatar') {
			setIsAvatarChange(false);
		}
	};
	const UpdateProfile = () => {
		let payload = {
			username: ProfileForm.username ? ProfileForm.username : '',
			fullName: ProfileForm.fullName ? ProfileForm.fullName : '',
			email: ProfileForm.email ? ProfileForm.email : '',
			avatar: ProfileForm.avatar ? ProfileForm.avatar : ''
		};

		dispatch(updateProfile(payload));
		setIsAvatarChange(false);
	};
	const ChangePassword = (passwordForm: PasswordChangeRequest) => {
		let payload: PasswordChangeRequest = {
			password: passwordForm.password,
			newPassword: passwordForm.newPassword
		};
		dispatch(changePassword(payload));
	};

	useEffect(() => {
		if (B64Value) {
			setProfileForm({
				...ProfileForm,
				avatar: B64Value
			});
		}
	}, [B64Value]);
	return (
		<Grid container spacing={2}>
			<Grid item xs={6}>
				<Paper variant="outlined">
					<Stack spacing={2}>
						<Item>
							<Tyography variant="h5">Basic info</Tyography>
							This is your information
						</Item>
						<Item>
							<Stack
								direction="row"
								spacing={1}
								height="100%"
								alignItems="center"
								justifyContent="center"
							>
								<Tyography variant="subtitle1" width="10%">
									Avatar
								</Tyography>
								<Stack
									flexGrow={1}
									height="300px"
									width="100%"
									alignItems="center"
									justifyContent="center"
									position="relative"
									ref={avatarRef}
								>
									<Stack sx={AvatarHoverSx} alignItems="center" justifyContent="center">
										<Stack alignItems="center" justifyContent="center" sx={AvatarHoverContentSx}>
											<CloudUploadIcon onClick={uploadPicture} />
											<input type="file" name="avatar" ref={pictureRef} onChange={onChange} />
										</Stack>
									</Stack>

									<Avatar sx={AvatarSx} src={avatar} alt="Avatar" variant="rounded">
										{profile?.username.charAt(0).toUpperCase() || 'N'}
									</Avatar>
								</Stack>
								<Stack flexGrow={1} alignItems="center" justifyContent="flex-start">
									<CustomEditInput
										isNotDisplay={true}
										label="Avatar"
										value={avatar}
										onChange={() => { }}
										onCancel={onCancel}
										onSave={UpdateProfile}
										isAvatarChange={IsAvatarChange}
									/>
								</Stack>
							</Stack>
							<Divider sx={{ marginTop: '10px' }} />
						</Item>
						<Item>
							<CustomEditInput
								label="Full Name"
								value={fullName}
								onChange={onChange}
								onCancel={onCancel}
								onSave={UpdateProfile}
							/>
						</Item>
					</Stack>
				</Paper>
			</Grid>
			<Grid item xs={6}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Paper variant="outlined">
							<Stack spacing={2}>
								<Item>
									<Tyography variant="h5">Contact info</Tyography>
								</Item>
								<Item>
									<CustomEditInput
										label="Email"
										value={email}
										onChange={onChange}
										onCancel={onCancel}
										onSave={UpdateProfile}
									/>
									<Divider sx={{ marginTop: '10px' }} />
								</Item>
							</Stack>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper variant="outlined">
							<Stack spacing={2}>
								<Item>
									<Tyography variant="h5">Password</Tyography>
								</Item>
								<Item>
									<CustomButton
										content="Change password"
										onClick={() => {
											setOpenPasswordChange(true);
										}}
									/>
								</Item>
							</Stack>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
			<PasswordChangeModal
				open={OpenPasswordChange}
				onClose={() => {
					setOpenPasswordChange(false);
				}}
				onSave={ChangePassword}
			/>
		</Grid>
	);
};

export default ProfilePage;
