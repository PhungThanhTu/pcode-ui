import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment } from 'react';

interface CustomDialogProps {
	open: boolean;
	onSave: Function;
	onCancel: Function;
	title: string;
	content: string;
}
const CustomDialog = (props: CustomDialogProps) => {
	const { title, content, open, onCancel, onSave } = props;
	return (
		<Dialog open={open}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Fragment>
					<Button onClick={() => onSave()}> Yes </Button>
					<Button onClick={() => onCancel()} autoFocus>
						No
					</Button>
				</Fragment>
			</DialogActions>
		</Dialog>
	);
};

export default CustomDialog;
