import { Paper } from '@mui/material';
import Box from '@mui/material/Box';

const BoxBackgroundSx = {
	height: '300px',
	width: '100%'
};
interface TabHeaderProps {
	background: string;
}
const ImageHeader = (props: TabHeaderProps) => {
	return (
		<Box sx={BoxBackgroundSx}>
			<Paper
				sx={{
					height: '100%',
					backgroundImage: `url(${
						props.background
							? props.background
							: 'https://www.gstatic.com/classroom/themes/Honors_thumb.jpg'
					})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: '100%',
					width: '100%'
				}}
			/>
		</Box>
	);
};

export default ImageHeader;
