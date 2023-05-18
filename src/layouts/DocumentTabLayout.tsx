import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Fragment } from 'react';
import { borderRadius, componentStyle, componentsBoxColor } from '@/style/Variables';

const BoxLeftSx = {
	backgroundColor: `${componentsBoxColor}`,
	maxHeight: 'inherit',
	minHeight: 'inherit',
	width: '100%',
	borderRadius: borderRadius,
	padding: '5px'
};
const BoxRightSx = {
	backgroundColor: `${componentsBoxColor}`,
	maxHeight: 'inherit',
	minHeight: 'inherit',
	width: '100%',
	borderRadius: borderRadius,
	padding: '5px'
};
interface PropsWithChildrenOnly {
	title: string;
	right?: React.ReactNode;
	left?: React.ReactNode;
	content?: React.ReactNode;
	children?: React.ReactNode;
}

const DocumentTabLayout = (props: PropsWithChildrenOnly) => {
	const { title, right, left, children, content } = props;

	return (
		<Stack flexDirection="column" rowGap={1} minHeight="100%" maxHeight={'inherit'}>
			<Box sx={componentStyle}>
				<Typography variant="h6">{title} </Typography>
			</Box>
			<Stack
				flexDirection="row"
				minHeight="700px"
				maxHeight="700px"
				width="100%"
				columnGap={2}
				alignItems={'flex-start'}
				justifyContent={'center'}
			>
				{content ? (
					content
				) : (
					<Fragment>
						<Box sx={BoxLeftSx}>{left}</Box>
						<Box sx={BoxRightSx}>{right}</Box>
					</Fragment>
				)}
			</Stack>
			<Box>{children}</Box>
		</Stack>
	);
};

export default DocumentTabLayout;
