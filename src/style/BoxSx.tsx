import { borderColor, borderRadius } from './Variables';

export const BoxModalSx = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'fit-content',
	bgcolor: 'background.paper',
	p: 4,
	borderRadius: borderRadius
};

export const BoxNotFoundSx = {
	width: '100%',
	height: '100%',
	display: 'flex',
	alighItems: 'center',
	justifyContent: 'center'
};

export const BoxFieldSx = {
	width: '100%',
	padding: '5px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	'& .MuiTextField-root': { m: 1, width: '100%' }
};

export const BoxItemSx = {
	border: `1px solid ${borderColor}`,
	width: '100%',
	padding: '1.25rem',
	borderRadius: borderRadius,
	boxShadow: '0 1px 2px 0 rgba(55,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)',
	cursor: 'pointer',
	display: 'flex',
	transition: 'boxShadow 0.3s ease, transform 0.3s ease',
	'&:hover': {
		boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)'
	}
};
