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

	var lines = content.split('\n');
	var elements = lines.map((line, index) => {
		return (
			<Fragment key={index}>
				{line}
				<br />
			</Fragment>
		);
	});

	return (
		<Dialog open={open}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{elements}</DialogContentText>
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
