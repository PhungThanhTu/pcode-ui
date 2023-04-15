import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';

import { Link as RouterLink } from 'react-router-dom';
import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/auth.slice';
import { getAuth } from '@/selectors/auth.selector';

function HideOnScroll(props: any) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}
const AvatarMenuPaper = {
	elevation: 0,
	sx: {
		overflow: 'visible',
		filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
		mt: 1.5,
		'& .MuiAvatar-root': {
			width: 32,
			height: 32,
			ml: -0.5,
			mr: 1
		},
		'&:before': {
			content: '""',
			display: 'block',
			position: 'absolute',
			top: 0,
			right: 30,
			width: 10,
			height: 10,
			bgcolor: 'background.paper',
			transform: 'translateY(-50%) rotate(45deg)',
			zIndex: 0
		}
	}
};
const LinkAvatarSx = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center'
};
const ToolBarSx = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	maxHeight: '55px',
	minHeight: '55px !important'
};

export default function NavBar() {
	const dispatch = useDispatch();
	const { profile } = useSelector(getAuth);

	const [hamAnchorEl, setHamAnchorEl] = useState<null | HTMLElement>(null);
	const [avatarAnchorEl, setAvatarAnchorEl] = useState<null | HTMLElement>(null);

	const hamMenuOpen = Boolean(hamAnchorEl);
	const avatarMenuOpen = Boolean(avatarAnchorEl);

	const handleAvatarMenuOpen = (event: MouseEvent<HTMLElement>) => {
		setAvatarAnchorEl(event.currentTarget);
	};
	const handleHamMenuOpen = (event: MouseEvent<HTMLElement>) => {
		setHamAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAvatarAnchorEl(null);
		setHamAnchorEl(null);
	};

	const returnToLogin = () => {
		dispatch(logout());
	};

	return (
		<Box>
			<HideOnScroll>
				<AppBar>
					<Toolbar sx={ToolBarSx}>
						<Box>
							<Tooltip title="Menu">
								<IconButton
									size="large"
									edge="start"
									color="inherit"
									aria-label="menu"
									sx={{ mr: 2 }}
									onClick={handleHamMenuOpen}
								>
									<MenuIcon />
								</IconButton>
							</Tooltip>
						</Box>
						<Menu
							anchorEl={hamAnchorEl}
							open={hamMenuOpen}
							onClose={handleClose}
							TransitionComponent={Fade}
						>
							<MenuItem>
								<Link component={RouterLink} to="/" underline="none" color="inherit">
									Home
								</Link>
							</MenuItem>
							<MenuItem>
								<Link component={RouterLink} to="/course" underline="none" color="inherit">
									Course
								</Link>
							</MenuItem>
						</Menu>

						<Typography color="white" variant="h6">
							Programming Learning Platform
						</Typography>

						<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
							<Tooltip title="User settings">
								<IconButton
									onClick={handleAvatarMenuOpen}
									size="large"
									sx={{ ml: 2 }}
									aria-controls={avatarMenuOpen ? 'account-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={avatarMenuOpen ? 'true' : undefined}
								>
									<Avatar sx={{ width: 45, height: 45 }} src={profile?.avatar}>
										{profile?.username.charAt(0).toUpperCase() || 'N'}
									</Avatar>
								</IconButton>
							</Tooltip>
						</Box>
						<Menu
							anchorEl={avatarAnchorEl}
							open={avatarMenuOpen}
							onClose={handleClose}
							PaperProps={AvatarMenuPaper}
							transformOrigin={{ horizontal: 'right', vertical: 'top' }}
							anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						>
							<MenuItem>
								<Link
									component={RouterLink}
									to="/profile"
									underline="none"
									color="inherit"
									sx={LinkAvatarSx}
								>
									<Avatar />
									Profile
								</Link>
							</MenuItem>
							<Divider />
							<MenuItem
								onClick={() => {
									returnToLogin();
								}}
							>
								<ListItemIcon>
									<Logout fontSize="small" />
								</ListItemIcon>
								Logout
							</MenuItem>
						</Menu>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
		</Box>
	);
}
