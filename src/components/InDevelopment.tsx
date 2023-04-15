import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const InDevelopment = () => {
	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
			style={{
				marginTop: '70px',
				minHeight: '100%'
			}}
		>
			<img width={450} height={450} alt="under-construction" src="/in-dev.svg" />
			<Typography variant="h5">This page is under construction, sorry for the inconvenience.</Typography>
		</Grid>
	);
};

export default InDevelopment;
