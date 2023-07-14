
import { Primary } from '@/style/Colors';
import { centerPos } from '@/style/Variables';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Box, Typography } from '@mui/material';

interface NoItemsFoundProps {
    msg?: string
}
const NoItemsFound = (props: NoItemsFoundProps) => {

    const { msg } = props

    return (
        <Box id="noitemsfound" sx={{ height: '100%', width: '100%', fontSize: '8rem', position: 'relative' }}>
            <Box sx={{ ...centerPos, fontSize: 'inherit', top: 45, color: 'rgba(0, 0, 0, 0.6)', opacity: 0.5 }}>
                <SearchOffIcon sx={{ fontSize: 'inherit', }} />
                <Typography variant='h6'>{msg}</Typography>
            </Box>

        </Box>
    )
}

export default NoItemsFound