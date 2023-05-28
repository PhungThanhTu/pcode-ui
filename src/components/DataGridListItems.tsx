import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
import { useDemoData } from '@mui/x-data-grid-generator';

interface DataGridListItemsProps {

}

const DataGridListItems = (props :DataGridListItemsProps) => {
  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    editable: true,
    visibleFields: [
      'commodity',
      'quantity',
      'filledQuantity',
      'status',
      'isFilled',
      'unitPrice',
      'unitPriceCurrency',
      'subTotal',
      'feeRate',
      'feeAmount',
      'incoTerm',
    ],
  });
  const apiRef = useGridApiRef();
  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      ...data.initialState,
      rowGrouping: {
        ...data.initialState?.rowGrouping,
        model: ['commodity'],
      },
      sorting: {
        sortModel: [{ field: '__row_group_by_columns_group__', sort: 'asc' }],
      },
    },
  });

  
  return (
    <Box sx={{ height: 520, maxWidth: 718.5 }}>
      <DataGridPremium
        {...data}
        sx={{maxWidth: 'inherit' ,height: '100%'}}
        apiRef={apiRef}
        loading={loading}
        disableRowSelectionOnClick
        initialState={initialState}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  )
}

export default DataGridListItems