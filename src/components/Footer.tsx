import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { FC, ReactElement } from 'react';
const FooterBoxSx = {
	position: 'relative',
	width: '100%',
	height: 'auto',
	backgroundColor: 'secondary',
	paddingTop: '1rem',
	paddingBottom: '1rem',
	'.MuiTypography-root': {
		fontSize: '9pt'
	}
};

export const Footer: FC = (): ReactElement => {
	return (
		<Box sx={FooterBoxSx}>
			<Container maxWidth="lg">
				<Grid container direction="column" alignItems="center">
					<Grid item xs={12}>
						<Typography color="black" variant="h5">
							@{`${new Date().getFullYear()}`}, PLP - all rights preserved
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography color="textSecondary" variant="subtitle1">
							Phung Thanh Tu | Nguyen Hoang Thai Duong
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};
export default Footer;
