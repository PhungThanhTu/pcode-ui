import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

export const InDevelopment = () => {
	return (
		<>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				style={{ minHeight: '100vh' }}
			>
				<img width={450} height={450} alt="under-construction" src="/public/in-dev.svg" />
				<Typography variant="h5">This page is under construction, sorry for the inconvenience.</Typography>
			</Grid>
		</>
	);
};
