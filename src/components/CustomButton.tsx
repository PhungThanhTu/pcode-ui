import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const blue = {
	500: '#1976d2',
	600: '#0072E5',
	700: '#0059B2'
};

export const StyledUnstyledButton = styled(ButtonUnstyled)`
	font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
	font-weight: bold;
	background-color: ${blue[500]};
	padding: 12px 24px;
	border-radius: 5px;
	color: white;
	transition: all 150ms ease;
	cursor: pointer;
	border: none;

	&:hover {
		background-color: ${blue[600]};
	}

	&.${buttonUnstyledClasses.active} {
		background-color: ${blue[700]};
	}

	&.${buttonUnstyledClasses.focusVisible} {
		box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
		outline: none;
	}

	&.${buttonUnstyledClasses.disabled} {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;
export const CustomButton = ({ content, onClick, type }: any) => (
	<StyledUnstyledButton type={type} onClick={onClick}>
		{content}
	</StyledUnstyledButton>
);
export const CustomIconButton = ({ content, onClick, type, startIcon }: any) => (
	<Button type={type} onClick={onClick} startIcon={startIcon}>
		{content}
	</Button>
);
