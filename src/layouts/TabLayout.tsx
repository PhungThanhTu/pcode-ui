import { borderRadius } from '@/style/Variables';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Fragment } from 'react';

interface PropsWithChildrenOnly {
	header: React.ReactNode;
	leftBody?: React.ReactNode;
	rightBody: React.ReactNode;
}

const BoxHeaderSx = {
	
	width: '100%',
	WebkitFontSmoothing: 'antialiased',
	WebkitTapHighlightColor: 'transparent',
	borderRadius: borderRadius,
	marginTop: '5px',
};

const BoxLeftBodySx = {
	height: '100%',
	flexShrink: '0',
	minWidth: '10.75rem',
	display: 'flex',
	flexDirection: 'column',
	alighItems: 'center',
	justifyContent: 'flex-start',
	rowGap: 2
};

const BoxRightBodySx = {
	margin: '0',
	padding: '1rem',
	paddingRight: 0,
	paddingTop: 0,
	flexGrow: '1',
	height: 'inherit',
	WebkitFontSmoothing: 'antialiased'
};

const TabLayout: React.FunctionComponent<PropsWithChildrenOnly> = (props: PropsWithChildrenOnly) => {
	return (
		<Stack flexDirection="column" display="flex" width="100%" paddingX="5%"  overflow={'auto'} height={'inherit'}>
			<Box sx={BoxHeaderSx}>{props.header}</Box>
			<Stack flexDirection="row" marginTop="15px"  height={'100%'}>
				{props.leftBody ? (
					<Fragment>
						<Box sx={BoxLeftBodySx}>{props.leftBody}</Box>
						<Box sx={BoxRightBodySx}>{props.rightBody}</Box>
					</Fragment>
				) : (
					<Box sx={{ ...BoxRightBodySx, paddingLeft: 0 }}>{props.rightBody}</Box>
				)}
			</Stack>
		</Stack>
	);
};

export default TabLayout;
