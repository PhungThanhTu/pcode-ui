import { DataGrid, GridRenderCellParams, GridToolbar, GridValueFormatterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {

	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { NameToField } from '@/utils/convert';
import GradingIcon from '@mui/icons-material/Grading';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Fragment, JSXElementConstructor } from 'react';
import { CustomIconButton } from './Custom/CustomButton';

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
					valueFormatter: (params: GridValueFormatterParams<number>) => {
						if (params.value == null) {
							return '';
						}

						return params.field.toUpperCase().includes('SCORE') ? Math.round((params.value + Number.EPSILON) * 100) / 100
							: params.value;
					},
					renderCell: (params: GridRenderCellParams) => {
						return params.value
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
					gridTools.map((item,index) => <Fragment key={index}>{item}</Fragment>) : null
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
