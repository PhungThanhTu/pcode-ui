import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TabIcon from '@mui/icons-material/Tab';

const borderColor = 'rgb(225,227,230)';

const AvatarSx = {
	position: 'absolute',
	top: '-20%',
	right: '5%',
	height: '75px',
	width: '75px'
};
const CardSx = {
	minWidth: 320,
	border: `solid 1px ${borderColor}`,
	shadow: 'none',
	height: '100%',
	width: '100%'
};
const CardContentSx = {
	position: 'relative',
	paddingTop: '50%',
	borderTop: `solid 1px ${borderColor}`,
	borderBottom: `solid 1px ${borderColor}`
};
const CardActionSx = {
	alignItems: 'center',
	justifyContent: 'flex-end'
};
interface CourseCardProps {
	title: String;
	subheader: String;
}
const CourseCard = (props: CourseCardProps) => {
	const { title, subheader } = props;
	return (
		<Card sx={CardSx}>
			<CardHeader
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={title}
				subheader={subheader}
			/>
			<CardContent sx={CardContentSx}>
				<Avatar sx={AvatarSx} />
			</CardContent>
			<CardActions disableSpacing sx={CardActionSx}>
				<IconButton>
					<TrendingUpIcon />
				</IconButton>
				<IconButton>
					<TabIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default CourseCard;
