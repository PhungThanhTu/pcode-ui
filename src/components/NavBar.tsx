import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Slide, useScrollTrigger } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/auth.slice';

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

export default function NavBar() {
	const dispatch = useDispatch();

	const returnToLogin = () => {
		dispatch(logout());
	};

	return (
		<Box>
			<HideOnScroll>
				<AppBar>
					<Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton>
						<Button onClick={() => returnToLogin()} color="inherit">
							{' '}
							Login{' '}
						</Button>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
		</Box>
	);
}
