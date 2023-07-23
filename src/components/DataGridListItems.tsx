import { DataGrid, GridRenderCellParams, GridToolbar, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


import { NameToField } from '@/utils/convert';

import { Fragment, JSXElementConstructor } from 'react';


interface DataGridListItemsProps {
	rows: Array<any>;
	columns: Array<string>;
	onSelected: Function;
	gridTools?: Array<JSX.Element>;
}



const DataGridListItems = (props: DataGridListItemsProps) => {
	const { rows, columns, onSelected, gridTools } = props;

	const Columns: Array<any> =
		columns && columns.length > 0
			? columns.map((item, index) => {
				return {
					field: NameToField(item, true),
					headerName: item,
					flex: item.toUpperCase().includes('SCORE') ? 0.23 : 1,
					renderCell: (params: GridRenderCellParams) => {
						return params.value
					},
					valueGetter: (params: GridValueGetterParams) => {
						if (params.value == null) {
							return '';
						}

						return params.field.toUpperCase().includes('SCORE') ?
							(Math.round((params.value) * 100) / 100)
							: params.value;
					},

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
		<Box sx={{
			height: '100%', width: '100%', '.MuiDataGrid-root': {
				borderLeft: 'unset',
				borderRight: 'unset',
				borderTop: 'unset !important',
			},
			'.MuiDataGrid-main': {
				borderTop: '1px solid rgba(224, 224, 224, 1)',


			},
			'.MuiDataGrid-toolbarContainer': {
				borderTop: 'unset !important',
			}
		}}>
			{
				gridTools && gridTools.length > 0 ?
					gridTools.map((item, index) => <Fragment key={index}>{item}</Fragment>) : null
			}
			<DataGrid

				rows={Rows}
				columns={Columns}
				onRowClick={(params) => onSelected(params)}
				disableRowSelectionOnClick
				slots={{ toolbar: GridToolbar }}
				

			/>
		</Box >
	);
};

export default DataGridListItems;
