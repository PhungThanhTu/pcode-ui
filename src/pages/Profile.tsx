import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Tyography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'


import { styled } from '@mui/material/styles';
import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';
import CustomEditInput from '@/components/CustomEditInput';
import PasswordChangeModal from '@/components/PasswordChangeModal';


const Item = styled(Paper)(({ theme }) => ({
	padding: '24px 24px 8px',
	boxShadow: 'none'

}));

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
							<Grid container spacing={2}>
								<Grid item xs={4}>
									Avatar
								</Grid>
								<Grid item xs={8}>
									<Avatar>N</Avatar>
								</Grid>
							</Grid>
						</Item>
						<Item>
							<Grid container spacing={2}>
								<Grid item xs={4}>
									Name
								</Grid>
								<Grid item xs={8}>
									<CustomEditInput />
								</Grid>
							</Grid>
							<Divider sx={{ marginTop: '10px' }} />
						</Item>
						<Item>
							<Grid container spacing={2}>
								<Grid item xs={4}>
									Gender
								</Grid>
								<Grid item xs={8}>
									<CustomEditInput />
								</Grid>
							</Grid>
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
									<Grid container spacing={2}>
										<Grid item xs={4}>
											Email
										</Grid>
										<Grid item xs={8}>
											<CustomEditInput />
										</Grid>
									</Grid>
									<Divider sx={{ marginTop: '10px' }} />
								</Item>
								<Item>
									<Grid container spacing={2}>
										<Grid item xs={4}>
											Phone
										</Grid>
										<Grid item xs={8}>
											<CustomEditInput />
										</Grid>
									</Grid>
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
