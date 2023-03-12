import React, { ChangeEvent } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tyography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CustomEditInput from '@/components/CustomEditInput';
import PasswordChangeModal from '@/components/PasswordChangeModal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { CustomButton } from '@/components/CustomButton';
import { getAuth } from '../selectors/auth.selector';
import { PasswordChangeRequest, UserProfile } from '@/types/auth.type';
import { changePassword, updateProfile } from '@/slices/profile.slice';

const Item = styled(Paper)(({ theme }) => ({
	padding: '24px 14px 10px',
	boxShadow: 'none'
}));
const AvatarSx = {
	height: '100%',
	width: '50%',
	fontSize: '100pt'
};
const AvatarHoverSx = {
	height: '100%',
	width: '100%',
	position: 'absolute',
	opacity: 0,
	'z-index': 10,
	'&:hover': {
		opacity: 0.6,
		background: '#ffffffe5',
		transitionProperty: 'opacity',
		transitionDuration: '0.25s',
		transitionTimingFunction: 'ease-in-out',
		transitionDelay: '0s',
		cursor: 'pointer'
	}
};
const AvatarHoverContentSx = {
	height: '50%',
	width: '50%',
	color: '#969696',
	fontSize: '100pt',
	fontWeight: 500,
	'.MuiSvgIcon-root': {
		height: '100%',
		width: '100%'
	}
};
const Profile = () => {
	const dispatch = useDispatch();
	const { profile } = useSelector(getAuth);

	const pictureRef = React.useRef<HTMLInputElement>(null);
	const avatarRef = React.useRef<HTMLElement>(null);
	const [profileForm, setProfileForm] = React.useState({ ...profile });
	const [OpenPasswordChange, setOpenPasswordChange] = React.useState(false);

	const { fullName, email, avatar } = profileForm;

	const UpdateProfile = () => {
		let payload = {
			username: profileForm.username ? profileForm.username : '',
			fullName: profileForm.fullName ? profileForm.fullName : '',
			email: profileForm.email ? profileForm.email : '',
			avatar: profileForm.avatar
		};

		dispatch(updateProfile(payload));
	};

	const uploadPicture = () => {
		if (pictureRef.current) {
			pictureRef.current.click();
		}
	};
	const onAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
		var file = e.target.files;
		if (FileReader && file && file.length) {
			var fr = new FileReader();
			fr.onload = function () {
				setProfileForm({
					...profileForm,
					avatar: fr.result?.toString()
				});
			};
			fr.readAsDataURL(file[0]);
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setProfileForm({
			...profileForm,
			[e.target.name]: e.target.value
		});
	};
	const onCancel = (name: keyof UserProfile) => {
		if (profile) {
			setProfileForm({
				...profileForm,
				[name]: profile[name]
			});
		}
	};
	const ChangePassword = (passwordForm: PasswordChangeRequest) => {
		let payload: PasswordChangeRequest = {
			password: passwordForm.password,
			newPassword: passwordForm.newPassword
		};
		dispatch(changePassword(payload));
	};

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
								<Tyography variant="subtitle1" width="20%">
									Avatar
								</Tyography>
								<Stack
									flexGrow={1}
									height="270px"
									width="100%"
									alignItems="center"
									justifyContent="center"
									position="relative"
									ref={avatarRef}
								>
									<Stack
										sx={AvatarHoverSx}
										alignItems="center"
										justifyContent="center"
										onClick={uploadPicture}
									>
										<Stack alignItems="center" justifyContent="center" sx={AvatarHoverContentSx}>
											<CloudUploadIcon />
											<input type="file" ref={pictureRef} onChange={onAvatarChange} />
										</Stack>
									</Stack>
									<Avatar sx={AvatarSx} src={avatar} id="avatar" alt="Avatar" variant="rounded">
										{profile?.username.charAt(0).toUpperCase() || 'N'}
									</Avatar>
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

export default Profile;
