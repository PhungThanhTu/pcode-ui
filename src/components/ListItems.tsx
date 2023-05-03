import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { DocumentItem } from './Document/DocumentItem';
import { useLocation, Link as RouterLink } from 'react-router-dom';

interface ListItemsProps {
	list: Array<any>;
}
const LinkItemSx = {
	display: 'block',
	width: '100%'
};
const ListItems = (props: ListItemsProps) => {
	const { pathname } = useLocation();
	const { list } = props;

	return (
		<Stack flexDirection="column" rowGap={2} alignItems="center" justifyContent="center" width="100%">
			{list.map((item, index) => {
				return (
					<Link
						key={index}
						component={RouterLink}
						to={`${pathname}/${item.Id}`}
						underline="none"
						color="inherit"
						sx={LinkItemSx}
					>
						<DocumentItem document={item} />
					</Link>
				);
			})}
		</Stack>
	);
};

export default ListItems;
