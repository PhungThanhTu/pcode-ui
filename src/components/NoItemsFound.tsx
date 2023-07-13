
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Box } from '@mui/material';

interface NoItemsFoundProps {
    msg?: string
}
const NoItemsFound = (props: NoItemsFoundProps) => {

    const { msg } = props

    return (
        <Box>
            <SearchOffIcon />
        </Box>
    )
}

export default NoItemsFound