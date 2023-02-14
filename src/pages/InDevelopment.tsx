import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import NavBar from '../components/NavBar';

export const InDevelopment = () => {
	return (
		<>
			<NavBar />
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				style={{ minHeight: '100%' }}
			>
				<img width={450} height={450} alt="under-construction" src="/in-dev.svg" />
				<Typography variant="h5">This page is under construction, sorry for the inconvenience.</Typography>
			</Grid>
		</>
	);
};
