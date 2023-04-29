import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CropFreeIcon from '@mui/icons-material/CropFree';
import Tooltip from '@mui/material/Tooltip';

import { MouseEvent, useState, useEffect } from 'react';
import { borderColor, borderRadius } from '@/style/Variables';
import { CustomOnlyIconButton } from '../Custom/CustomButton';

const BoxContainerSx = {
	border: `solid 1px ${borderColor}`,
	height: '100%',
	display: 'flex',
	padding: '1.5rem 2rem',
	alighItems: 'center',
	justifyContent: 'center',
	borderRadius: borderRadius,
};

interface CourseCodeBox {
	code: string;
}

const CourseCodeBox = (props: CourseCodeBox) => {
	const [Copied, setCopied] = useState(false);

	const onCopy = async (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setCopied(true);
		await navigator.clipboard.writeText(props.code);
	};

	useEffect(() => {
		if (Copied) {
			const timeout = setTimeout(() => {
				setCopied(false);
			}, 2000);
			return () => {
				clearTimeout(timeout);
			};
		}
	}, [Copied]);
	return (
		<Box sx={BoxContainerSx}>
			<Typography display="flex" alignItems="center" justifyContent="center" variant="h5">
				{props.code}
			</Typography>
			<CustomOnlyIconButton onClick={onCopy}>
				<Tooltip title={Copied ? 'Copied to clipboard' : 'Get this course code'}>
					<CropFreeIcon />
				</Tooltip>
			</CustomOnlyIconButton>
		</Box>
	);
};

export default CourseCodeBox;
