import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TabIcon from '@mui/icons-material/Tab';
import Tooltip from '@mui/material/Tooltip';

const borderColor = 'rgb(225,227,230)';

const AvatarSx = {
	position: 'absolute',
	top: '-20%',
	right: '5%',
	height: '75px',
	width: '75px'
};
const CardSx = {
	border: `solid 1px ${borderColor}`,
	boxShadow: 'none',
	height: '100%',
	width: '100%'
};
const CardHeaderSx = {
	backgroundImage: 'url("https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg")',
	height: '35%',
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
	paddingTop: '50%',
	borderTop: `solid 1px ${borderColor}`,
	borderBottom: `solid 1px ${borderColor}`,
	height: '50%'
};
const CardActionSx = {
	alignItems: 'center',
	justifyContent: 'flex-end',
};
interface CourseCardProps {
	title: string;
	subheader: string;
	theme: string;
}
const CourseCard = (props: CourseCardProps) => {
	const { title, subheader, theme } = props;
	const Sx = theme ? {
		...CardHeaderSx, backgroundImage: `url(${theme})`
	} : CardHeaderSx
	return (
		<Card sx={CardSx}>
			<CardHeader
				sx={Sx}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={
					<Tooltip
						title={title}>
						<div>{title}</div>
					</Tooltip>
				}
				subheader={subheader}
			/>
			<CardContent sx={CardContentSx}>
				<Avatar sx={AvatarSx} alt="theme" />
			</CardContent>
			<CardActions disableSpacing sx={CardActionSx}>
				<Tooltip title='Get invitation link for this course'>
					<IconButton>
						<TabIcon />
					</IconButton>
				</Tooltip>
			</CardActions>
		</Card>
	);
};

export default CourseCard;
