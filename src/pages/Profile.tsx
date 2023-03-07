import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Tyography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'


import { styled } from '@mui/material/styles';
import { CustomButton } from '@/components/CustomButton';
import CustomEditInput from '@/components/CustomEditInput';
import PasswordChangeModal from '@/components/PasswordChangeModal';


const Item = styled(Paper)(({ theme }) => ({
	padding: '24px 14px 10px',
	boxShadow: 'none'

}));
const AvatarSx = {
	height: '100%',
	width: '50%'
}

const Profile = () => {
	const initialForm = {
		name: '',
		phone: '',
		email: '',
		gender: ''
	}

	const [ProfileForm, setProfileForm] = React.useState(initialForm)
	const [OpenPasswordChange, setOpenPasswordChange] = React.useState(false)

	const UpdateProfile = () => {
		console.log("Updaet Profile")
	}

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
									>
										N
									</Avatar>
								</Stack>

							</Stack>
						</Item>
						<Item>
							<CustomEditInput label='Name' />
							<Divider sx={{ marginTop: '10px' }} />
						</Item>
						<Item>
							<CustomEditInput label='Gender' />
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
									<CustomEditInput label='Email' />
									<Divider sx={{ marginTop: '10px' }} />
								</Item>
								<Item>
									<CustomEditInput label='Phone' />
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
