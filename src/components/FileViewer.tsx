
import { centerPos } from '@/style/Variables';
import { toSize } from '@/utils/convert';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { Box, Typography } from '@mui/material';
import { saveAs } from 'file-saver';

interface FileViewerProps {
    source: Blob
}
const FileViewer = (props: FileViewerProps) => {

    const { source } = props
  
    const onClick = () => {
        saveAs(source, source.name ? source.name : "content")
    }

    return (
        <Box sx={{ ...centerPos, top: '20%', cursor: 'pointer' }} onClick={onClick}>
            <FolderZipIcon sx={{ fontSize: '15rem' }} />
            <Typography variant='h5'>{source.name ? source.name : 'file'}</Typography>
            <Typography variant='subtitle1'>{toSize(Number(source.size))}</Typography>
        </Box>
    )
}

export default FileViewer