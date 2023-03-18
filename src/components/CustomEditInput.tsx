import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
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

const CustomEditInput = (props: any) => {
	const [isEdit, setIsEdit] = React.useState(false);

	const { label, value, onChange, onSave, onCancel, isNotDisplay, is } = props;
	const name = labelToProperty(props.label);

	useEffect(() => {
		console.log(props.isAvatarChange)
		if (props.isAvatarChange) {
			setIsEdit(true)
		}
		else {
			setIsEdit(false)
		}
	}, [props.isAvatarChange])
	return (
		<Stack
			direction="row"
			spacing={1}
			height="100%"
			alignItems="center"
			justifyContent="center"
		>
			<Stack width="20%">
				{!isNotDisplay ? <Typography variant="subtitle1">{label}</Typography> : null}
			</Stack>
			<Stack flexGrow={1}>

				{isEdit ? (
					!isNotDisplay ?
						<TextField
							name={name}
							fullWidth
							variant="standard"
							value={value ? value : ''}
							onChange={onChange}
						/>
						: null
				) : (
					!isNotDisplay ? <Typography variant="body1">{value ? value : 'null'}</Typography> : null
				)}
			</Stack>
			<React.Fragment>
				{
					<Stack
						flexGrow={1}
						direction="row"
						spacing={2}
						height="100%"
						alignItems="center"
						justifyContent="center"
					>
						{isEdit ? (
							<React.Fragment>
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
							</React.Fragment>
						) : (
							!isNotDisplay ? <CustomEditIcon
								onClick={() => {
									setIsEdit(true);
								}}
							/>
								: null
						)}
					</Stack>
				}
			</React.Fragment>
		</Stack>
	);
};

CustomEditInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	value: PropTypes.string,
	label: PropTypes.string.isRequired,
	isNotDisplay: PropTypes.bool,
	isAvatarChange: PropTypes.bool
};

export default CustomEditInput;
