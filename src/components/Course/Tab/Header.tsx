import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { CustomIconButton } from '@/components/Custom/CustomButton';

const BoxSx = {
	height: '300px',
	width: '100%',
	position: 'relative'
};
const BoxTitleSx = {
	bottom: 0,
	color: '#fff',
	left: 0,
	padding: '1rem 1.5rem',
	position: 'absolute',
	right: 0
};
const BoxActionSx = {
	color: '#1976D2',
	top: 0,
	padding: '1rem 1.5rem',
	position: 'absolute',
	right: 0
};

interface TabHeaderProps {
	background: string;
	title: string;
	subtitle: string;
	customizeButton: Function;
}

const Header = (props: TabHeaderProps) => {


	return (
		<Box sx={BoxSx}>
			<Paper
				sx={{
					height: '100%',
					backgroundImage: `url(${props.background
						? props.background
						: 'https://www.gstatic.com/classroom/themes/Honors_thumb.jpg'
						})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: '100%',
					width: '100%',
					position: 'absolute'
				}}
			/>
			<Box sx={BoxTitleSx}>
				<Typography variant="h4">{props.title}</Typography>
				<Typography variant="h6">{props.subtitle}</Typography>
			</Box>
			<Box sx={BoxActionSx}>
				<CustomIconButton startIcon={<EditIcon />} content="Customize" variant="contained" color="inherit" onClick={props.customizeButton}  />
			</Box>
		</Box>
	);
};

export default Header;