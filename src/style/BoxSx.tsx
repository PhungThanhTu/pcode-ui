import { borderRadius } from './Variables';

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
