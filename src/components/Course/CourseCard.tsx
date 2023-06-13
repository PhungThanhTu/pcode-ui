import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import Tooltip from '@mui/material/Tooltip';

import { useEffect, useState, MouseEvent } from 'react';
import { Course } from '@/types/course.type';
import { borderColor } from '@/style/Variables';
import { CustomOnlyIconButton } from '../Custom/CustomButton';

// const AvatarSx = {
// 	position: 'absolute',
// 	top: '-20%',
// 	right: '5%',
// 	height: '75px',
// 	width: '75px'
// };
const CardSx = {
	border: `solid 1px ${borderColor}`,
	height: '100%',
	width: '100%',
	transition: 'box-shadow 0.3s ease-in-out',
	'&:hover': {
		boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
		cursor: 'pointer'
	}
};
const CardHeaderSx = {
	backgroundImage: 'url("https://www.gstatic.com/classroom/themes/Honors_thumb.jpg")',
	backgroundPosition: '50% -100%',
	height: '30%',
	color: 'white',
	'.MuiCardHeader-content': {
		width: '90%',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	},
	'.MuiCardHeader-action': {
		width: '10%'
	}
};
const CardContentSx = {
	position: 'relative',
	paddingTop: '40%',
	borderTop: `solid 1px ${borderColor}`,
	borderBottom: `solid 1px ${borderColor}`,
	height: '50%'
};
const CardActionSx = {
	alignItems: 'center',
	justifyContent: 'flex-end'
};
interface CourseCardProps {
	course: Course;
	onDirect: Function;
}

const CourseCard = (props: CourseCardProps) => {
	const { course, onDirect } = props;

	const [Copied, setCopied] = useState(false);

	const Sx = course.courseTheme
		? {
				...CardHeaderSx,
				backgroundImage: `url(${course.courseTheme})`
		  }
		: CardHeaderSx;

	const onCopy = async (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const host = window.location.host;
		await navigator.clipboard.writeText(`${host}/invitation/${course.Code}`);
		setCopied(true);
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
		<Card sx={CardSx} onClick={() => onDirect(course.id)}>
			<CardHeader
				sx={Sx}
				title={
					<Tooltip title={course.title}>
						<div style={{ fontSize: '14pt' }}>{course.title}</div>
					</Tooltip>
				}
				subheader={<div style={{ color: 'white' }}>{course.CreatorName}</div>}
			/>
			<CardContent sx={CardContentSx}></CardContent>
			<CardActions disableSpacing sx={CardActionSx}>
				<CustomOnlyIconButton onClick={onCopy}>
					<Tooltip title={Copied ? 'Copied to clipboard' : 'Get invitation link for this course'}>
						<ShareIcon />
					</Tooltip>
				</CustomOnlyIconButton>
			</CardActions>
		</Card>
	);
};

export default CourseCard;
