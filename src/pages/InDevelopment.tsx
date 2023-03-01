import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Layout from '../layouts/Layout';
import React from 'react';


export const InDevelopment = () => {
	return (
		<React.Fragment>
			<Layout>
				<Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="center"
					style={{
						marginTop: '70px',
						minHeight: '100%',
					}}
				>
					<img width={450} height={450} alt="under-construction" src="/in-dev.svg" />
					<Typography variant="h5">This page is under construction, sorry for the inconvenience.</Typography>
				</Grid>

			</Layout>

		</React.Fragment>
	);
};
