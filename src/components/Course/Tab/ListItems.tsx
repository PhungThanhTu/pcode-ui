import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

interface ListItemsProps {
	list: Array<any>;
}
const ListItems = (props: ListItemsProps) => {
	const { list } = props;
	return (
		<Box>
			<Stack flexDirection="column" rowGap={2} alignItems="center" justifyContent="center">
				{list}
			</Stack>
		</Box>
	);
};

export default ListItems;
