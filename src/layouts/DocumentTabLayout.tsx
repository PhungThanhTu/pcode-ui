import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Fragment, useEffect, useState } from 'react';
import { borderRadius, componentStyle, componentsBoxColor } from '@/style/Variables';

const BoxLeftSx = {
	backgroundColor: `${componentsBoxColor}`,
	height: 'inherit',
	width: '100%',
	borderRadius: borderRadius,
	// padding: '5px',
	position: 'relative',
	flexGrow: 1
};
const BoxRightSx = {
	backgroundColor: `${componentsBoxColor}`,
	height: 'inherit',
	width: '100%',
	borderRadius: borderRadius,
	// padding: '5px',
	position: 'relative',
	flexGrow: 1
};
const BoxChildRightSx = {
	display: 'flex',
	position: 'absolute',
	bottom: 0,
	left: 0,
	width: '100%',
	// padding: '5px',
	borderRadius: `0 0 ${borderRadius} ${borderRadius}`
};
const BoxChildLeftSx = {
	display: 'flex',
	position: 'absolute',
	bottom: 0,
	left: 0,
	width: '100%',
	// padding: '5px',
	borderRadius: `0 0 ${borderRadius} ${borderRadius}`
};
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

	const [TabLayoutHeaderHeight, setTabLayoutHeaderHeight] = useState(document.getElementById('TabLayoutHeader')?.offsetHeight)
	const [TabLayoutHeight, setTabLayoutHeight] = useState(document.getElementById('TabLayout')?.offsetHeight)

	// const TabLayoutHeaderHeight = document.getElementById('TabLayoutHeader')?.offsetHeight;
	// const TabLayoutHeight = document.getElementById('TabLayout')?.offsetHeight;

	useEffect(() => {
		if (document.getElementById('TabLayoutHeader')?.offsetHeight) {
			setTabLayoutHeaderHeight(document.getElementById('TabLayoutHeader')?.offsetHeight)
		}
		if (document.getElementById('TabLayout')?.offsetHeight) {
			setTabLayoutHeight(document.getElementById('TabLayout')?.offsetHeight)
		}
	}, [TabLayoutHeight, TabLayoutHeaderHeight])

	return (
		<Stack flexDirection="column" rowGap={1} height='inherit' id='TabLayout'>
			{title ? (
				<Box sx={componentStyle} id='TabLayoutHeader'>
					<Typography variant="subtitle1">{title} </Typography>
				</Box>
			) : null}

			<Stack
				flexDirection="row"
				height={`calc(${TabLayoutHeight}px - ${TabLayoutHeaderHeight}px - 9px)`}
				// top={Number(TabLayoutHeight ? TabLayoutHeight : 0 - (TabLayoutHeaderHeight ? TabLayoutHeaderHeight : 0))}
				width="100%"
				columnGap={1}
				alignItems={'flex-start'}
				justifyContent={'center'}
				position="relative"
			>
				{content ?
					content
					: childrenPosition ?
						<Fragment>
							<Box sx={BoxLeftSx}>{left}</Box>
							<Box sx={BoxRightSx}>
								{right}
								<Box sx={BoxChildRightSx}>{children}</Box>
							</Box>
						</Fragment>
						:
						<Fragment>
							<Box sx={BoxLeftSx}>
								{left}
								<Box sx={BoxChildLeftSx}>{children}</Box>
							</Box>
							<Box sx={BoxRightSx}>{right}</Box>
						</Fragment>
				}
			</Stack>
		</Stack>
	);
};

export default DocumentTabLayout;
