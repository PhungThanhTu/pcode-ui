import { useEffect, useState, Fragment } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { labelToProperty } from '@/utils/convert';

export const CustomEditIcon = styled(EditIcon)(({ theme }) => ({
	color: theme.palette.primary.main,
	cursor: 'pointer'
}));

export const CustomSaveIcon = styled(CheckCircleIcon)(({ theme }) => ({
	color: theme.palette.success.main,
	cursor: 'pointer'
}));
export const CustomCancelIcon = styled(CancelIcon)(({ theme }) => ({
	color: theme.palette.error.main,
	cursor: 'pointer'
}));

interface CustomEditInputProps {
	onChange: Function;
	onSave: Function;
	onCancel: Function;
	value?: string;
	label: string;
	isNotDisplay?: Boolean;
	isAvatarChange?: Boolean;
}

const CustomEditInput = (props: CustomEditInputProps) => {
	const [isEdit, setIsEdit] = useState(false);

	const { label, value, onChange, onSave, onCancel, isNotDisplay, isAvatarChange } = props;
	const name = labelToProperty(props.label);

	const RenderFields = () => {
		if (isEdit) {
			return !isNotDisplay ? (
				<TextField
					name={name}
					fullWidth
					variant="standard"
					value={value ? value : ''}
					onChange={(e) => {
						onChange(e);
					}}
				/>
			) : null;
		} else {
			return !isNotDisplay ? <Typography variant="body1">{value ? value : 'null'}</Typography> : null;
		}
	};
	const RenderButtons = () => {
		if (isEdit) {
			return (
				<Fragment>
					<CustomSaveIcon
						onClick={() => {
							onSave();
							setIsEdit(false);
						}}
					/>
					<CustomCancelIcon
						onClick={() => {
							onCancel(name);
							setIsEdit(false);
						}}
					/>
				</Fragment>
			);
		} else {
			return !isNotDisplay ? (
				<CustomEditIcon
					onClick={() => {
						setIsEdit(true);
					}}
				/>
			) : null;
		}
	};
	useEffect(() => {
		if (isAvatarChange) {
			setIsEdit(true);
		} else {
			setIsEdit(false);
		}
	}, [isAvatarChange]);

	return (
		<Stack direction="row" spacing={1} height="100%" alignItems="center" justifyContent="center">
			<Stack width="20%">{!isNotDisplay ? <Typography variant="subtitle1">{label}</Typography> : null}</Stack>
			<Stack flexGrow={1}>{RenderFields()}</Stack>
			<Fragment>
				{
					<Stack
						flexGrow={1}
						direction="row"
						spacing={2}
						height="100%"
						alignItems="center"
						justifyContent="center"
					>
						{RenderButtons()}
					</Stack>
				}
			</Fragment>
		</Stack>
	);
};

export default CustomEditInput;
