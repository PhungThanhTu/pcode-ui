import React, { ChangeEvent } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Tyography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import CustomEditInput from '@/components/CustomEditInput';
import PasswordChangeModal from '@/components/PasswordChangeModal';

import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { CustomButton } from '@/components/CustomButton';
import { getAuth } from '../selectors/auth.selector';
import { UserProfile } from '@/types/auth.type';
import { updateProfile } from '@/slices/profile.slice';



const Item = styled(Paper)(({ theme }) => ({
	padding: '24px 14px 10px',
	boxShadow: 'none'

}));
const AvatarSx = {
	height: '100%',
	width: '50%'
}

const Profile = () => {
	const dispatch = useDispatch();
	const { profile } = useSelector(getAuth);

	const [profileForm, setProfileForm] = React.useState({ ...profile });
	const [OpenPasswordChange, setOpenPasswordChange] = React.useState(false);

	const { fullName, email } = profileForm

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setProfileForm({
			...profileForm,
			[e.target.name]: e.target.value
		})
	};
	const onCancel = (name: keyof UserProfile) => {
		if (profile) {
			setProfileForm({
				...profileForm,
				[name]: profile[name]
			})
		}
	};
	const UpdateProfile = () => {
		let payload = {
			username: profileForm.username ? profileForm.username : "",
			fullName: profileForm.fullName ? profileForm.fullName : "",
			email: profileForm.email ? profileForm.email : "",
			avatar: profileForm.avatar
		};
		if (window.confirm("Update this property?")) {
			dispatch(updateProfile(payload))
		}
	};

	return (
		<Grid container spacing={2} >
			<Grid item xs={6}>
				<Paper variant="outlined" >
					<Stack spacing={2}>
						<Item >
							<Tyography variant='h5'>Basic info</Tyography>
							This is your information
						</Item>
						<Item>
							<Stack
								direction='row'
								spacing={1}
								height='100%'
								alignItems='center'
								justifyContent='center'
							>
								<Tyography variant='subtitle1' width='20%'>Avatar</Tyography>
								<Stack
									flexGrow={1}
									height='270px'
									width='100%'
									alignItems='center'
									justifyContent='center'
								>
									<Avatar
										sx={AvatarSx}
										id="avatar"
										alt="Avatar"
										variant='rounded'

									>
										N
									</Avatar>
								</Stack>

							</Stack>
							<Divider sx={{ marginTop: '10px' }} />
						</Item>
						<Item>
							<CustomEditInput label='Full Name' value={fullName} onChange={onChange} onCancel={onCancel} onSave={UpdateProfile} />
						</Item>
					</Stack>
				</Paper>
			</Grid>
			<Grid item xs={6} >
				<Grid container spacing={2} >
					<Grid item xs={12}>
						<Paper variant="outlined" >
							<Stack spacing={2}>
								<Item >
									<Tyography variant='h5'>Contact info</Tyography>
								</Item>
								<Item>
									<CustomEditInput label='Email' value={email} onChange={onChange} onCancel={onCancel} onSave={UpdateProfile} />
									<Divider sx={{ marginTop: '10px' }} />
								</Item>
							</Stack>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper variant="outlined" >
							<Stack spacing={2}>
								<Item >
									<Tyography variant='h5'>Password</Tyography>
								</Item>
								<Item>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<Tyography variant='h6'>••••••••••••••••</Tyography>
											<Tyography >Last change on 02-03-2023</Tyography>
										</Grid>
									</Grid>
									<Divider sx={{ marginTop: '10px' }} />
								</Item>
								<Item>
									<CustomButton content='Change password' onClick={() => { setOpenPasswordChange(true) }} />
								</Item>
							</Stack>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
			<PasswordChangeModal open={OpenPasswordChange} onClose={() => { setOpenPasswordChange(false) }} />
		</Grid>

	)

};

export default Profile;
