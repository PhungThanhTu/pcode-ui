import Button from '@mui/material/Button';
import styled from '@mui/system/styled';
import IconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/material';

import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { Primary } from '@/style/Colors';


export const StyledUnstyledButton = styled(ButtonUnstyled)`
	font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
	font-weight: bold;
	background-color: ${Primary['main']};
	padding: 12px 24px;
	border-radius: 5px;
	color: white;
	transition: all 150ms ease;
	cursor: pointer;
	border: none;

	&:hover {
		background-color: ${Primary['dark']};
	}

	&.${buttonUnstyledClasses.active} {
		background-color: ${Primary['dark']};
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
export const CustomButton = ({ content, onClick, type, sx }: any) => (
	<StyledUnstyledButton sx={sx} type={type} onClick={onClick}>
		{content}
	</StyledUnstyledButton>
);

export const CustomIconButton = ({ content, sx, variant, type, onClick, startIcon, color, fullWidth }: any) => (
	<Button color={color} sx={sx} variant={variant} type={type} onClick={onClick} startIcon={startIcon} fullWidth={fullWidth}>
		{content}
	</Button>
);

interface CustomOnlyIconButtonProps {
	sx?: SxProps;
	children: any;
	variant?: any;
	color?: any;
	onClick?: Function;
	form?: string;
	disabled?: boolean;
	submit?: boolean;
	onSubmit?: any;
}
export const CustomOnlyIconButton = (props: CustomOnlyIconButtonProps) => (
	<IconButton
		onSubmit={props.onSubmit ? props.onSubmit : null}
		type={props.submit ? "submit" : "button"}
		color={props.color}
		sx={props.sx}
		onClick={(e) => {
			props.onClick ?
				props.onClick(e) :
				null
		}}
		form={props.form}
		disabled={props.disabled}
	>
		{props.children}
	</IconButton>
);
