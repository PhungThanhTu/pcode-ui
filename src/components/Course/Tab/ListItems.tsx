import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DocumentItem } from './DocumentItem';

interface ListItemsProps {
	list: Array<any>;
}
const ListItems = (props: ListItemsProps) => {
	const { list } = props;
	return (
		<Stack flexDirection="column" rowGap={2} alignItems="center" justifyContent="center" width="100%">
			{
				list.map((item, index) => {
					return <DocumentItem key={index} document={item} />
				})
			}
		</Stack>
	);
};

export default ListItems;
