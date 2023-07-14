import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { DocumentItem } from './Document/DocumentItem';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import NoItemsFound from './NoItemsFound';


interface ListItemsProps {
	list: Array<any>;
	publishDocument?: Function | null;
	isCreator?: boolean;
}
const LinkItemSx = {
	display: 'block',
	width: '100%'
};
const ListLinkedItems = (props: ListItemsProps) => {

	const { pathname } = useLocation();
	const { list, publishDocument, isCreator } = props;

	return (
		<Stack flexDirection="column" height="100%" rowGap={2} alignItems="center" justifyContent="flex-start" width="100%">

			{list ?
				list.length > 0 ?

					list.map((item, index) => {
						return (
							<Link
								key={index}
								component={RouterLink}
								to={`${pathname}/${item.Id}`}
								underline="none"
								color="inherit"
								sx={LinkItemSx}
							>
								<DocumentItem
									isCreator={isCreator ? isCreator : false}
									document={item}
									publishDocument={
										publishDocument
											? publishDocument
											: () => {
												console.log('Null Publish');
											}
									}
								/>
							</Link>
						);
					})
					: <NoItemsFound  msg={"No documents found!"}/>
				: null

			}
		</Stack>
	);
};

export default ListLinkedItems;
