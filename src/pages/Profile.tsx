import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Tyography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit';

import { styled } from '@mui/material/styles';
import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';


const Profile = () => {
	const Item = styled(Paper)(({ theme }) => ({
		padding: '24px 24px 8px',
		boxShadow: 'none'

	}));
	const CustomEditIcon = styled(EditIcon)(({theme}) => ({
		color: theme.palette.primary.main,

	}));

	return (
		<Grid  container spacing={2} >
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
									Name
								</Grid>
								<Grid item xs={8}>
									<Avatar>N</Avatar>
								</Grid>
							</Grid>
						</Item>
						<Item>
							<Grid container spacing={2}>
								<Grid item xs={3}>
									Name
								</Grid>
								<Grid item xs={8}>
									Field
								</Grid>
								<Grid item xs={1}>
									<CustomEditIcon />
								</Grid>
							</Grid>
							<Divider sx={{ marginTop: '10px' }} />
						</Item>
						<Item>
							<Grid container spacing={2}>
								<Grid item xs={3}>
									Gender
								</Grid>
								<Grid item xs={8}>
									Field
								</Grid>
								<Grid item xs={1}>
									<CustomEditIcon />
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
										<Grid item xs={3}>
											Email
										</Grid>
										<Grid item xs={8}>
											Field
										</Grid>
										<Grid item xs={1}>
											<CustomEditIcon />
										</Grid>
									</Grid>
									<Divider sx={{ marginTop: '10px' }} />
								</Item>
								<Item>
									<Grid container spacing={2}>
										<Grid item xs={3}>
											Phone
										</Grid>
										<Grid item xs={8}>
											Field
										</Grid>
										<Grid item xs={1}>
											<CustomEditIcon />
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
									<CustomButton content='Change password' />
								</Item>
							</Stack>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</Grid>

	)

};

export default Profile;
