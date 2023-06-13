import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import { NameToField } from '@/utils/convert';

interface DataGridListItemsProps {
	rows: Array<any>;
	columns: Array<string>;
	onSelected: Function;
}

const DataGridListItems = (props: DataGridListItemsProps) => {
	const { rows, columns, onSelected } = props;

	const Columns: Array<any> =
		columns && columns.length > 0
			? columns.map((item, index) => {
					return {
						field: NameToField(item, true),
						headerName: item,
						flex: item.toUpperCase().includes('SCORE') ? 0.2 : 1,
						headerAlign: 'center',
						align: 'center'
					};
			  })
			: [];

	const Rows: Array<any> =
		rows && rows.length > 0
			? rows.map((item, index) => {
					let keyId = Object.keys(item);

					if (keyId.includes('id')) return item;

					return {
						...item,
						id: index
					};
			  })
			: [];

	return (
		<Box sx={{ height: '700px', width: '100%' }}>
			<DataGrid
				rows={Rows}
				columns={Columns}
				onRowClick={(params) => onSelected(params)}
				disableRowSelectionOnClick
				slots={{ toolbar: GridToolbar }}
			/>
		</Box>
	);
};

export default DataGridListItems;
