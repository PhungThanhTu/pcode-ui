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
	padding: '5px',
	position: 'relative'
};
const BoxRightSx = {
	backgroundColor: `${componentsBoxColor}`,
	maxHeight: 'inherit',
	minHeight: 'inherit',
	width: '100%',
	borderRadius: borderRadius,
	padding: '5px',
	position: 'relative'
};
const BoxChildRightSx = {
	position: 'absolute',
	bottom: 10,
	left: 0,
	width: '100%',
	padding: '10px'
}
const BoxChildLeftSx = {
	position: 'absolute',
	bottom: 0,
	left: 0,
	width: '100%',
	padding: '5px',
	borderRadius : `0 0 ${borderRadius} ${borderRadius}`

}
interface PropsWithChildrenOnly {
	title?: string;
	right?: React.ReactNode;
	left?: React.ReactNode;
	content?: React.ReactNode;
	children?: React.ReactNode;
	childrenPosition?: boolean;
}

const DocumentTabLayout = (props: PropsWithChildrenOnly) => {
	const { title, right, left, children, content, childrenPosition } = props;

	return (
		<Stack flexDirection="column" rowGap={1} minHeight="100%" maxHeight={'inherit'}>
			{title ? (
				<Box sx={componentStyle}>
					<Typography variant="h6">{title} </Typography>
				</Box>
			) : null}

			<Stack
				flexDirection="row"
				minHeight="700px"
				maxHeight="700px"
				width="100%"
				columnGap={2}
				alignItems={'flex-start'}
				justifyContent={'center'}
				position="relative"
			>
				{content ? (
					content
				) : (

					childrenPosition ?
						<Fragment>
							<Box sx={BoxLeftSx}>
								{left}
							</Box>
							<Box sx={BoxRightSx}>{right}
								<Box sx={BoxChildRightSx}>
									{children}
								</Box>
							</Box>
						</Fragment>
						:
						<Fragment>
							<Box sx={BoxLeftSx}>
								{left}
								<Box sx={BoxChildLeftSx}>
									{children}
								</Box>
							</Box>
							<Box sx={BoxRightSx}>{right}
							</Box>

						</Fragment>

				)}
			</Stack>

		</Stack>
	);
};

export default DocumentTabLayout;
