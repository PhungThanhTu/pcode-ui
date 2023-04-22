import { borderColor } from '@/style/Variables';
import { Box, Typography } from '@mui/material';

const BoxContainerSx = {
	border: `solid 1px ${borderColor}`,
	height: '100%',
	display: 'flex',
	padding: '1.5rem 2rem',
	alighItems: 'center',
	justifyContent: 'center'
};
interface CourseCodeBox {
	code: string;
}

const CourseCodeBox = (props: CourseCodeBox) => {
	return (
		<Box sx={BoxContainerSx}>
			<Typography variant="h5">{props.code}</Typography>
		</Box>
	);
};

export default CourseCodeBox;
