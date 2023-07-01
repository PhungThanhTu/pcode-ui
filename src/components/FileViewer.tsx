
import { centerPos } from '@/style/Variables';
import { toSize } from '@/utils/convert';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { Box, Typography } from '@mui/material';
import { saveAs } from 'file-saver';

const baseUrl = import.meta.env.VITE_BACKEND_ENDPOINT;

interface FileViewerProps {
    source: Blob,
    contentBody: string,
}
const FileViewer = (props: FileViewerProps) => {

    const { source, contentBody } = props

    const onClick = () => {
        // dispatch(downloadDocumentContent({ contentId: contentId, documentId: params.documentId ? params.documentId : '' }))
        // saveAs(source, source.name ? source.name : "content")
    }

    return (
        <Box sx={{ ...centerPos, top: '20%', cursor: 'pointer' }} onClick={onClick}>
            <a href={`${baseUrl}media/${contentBody}`} target='_blank' >
                <FolderZipIcon sx={{ fontSize: '15rem' }} />
            </a>

            <Typography variant='h5'>{source.name ? source.name : 'file'}</Typography>
            <Typography variant='subtitle1'>{toSize(Number(source.size))}</Typography>
        </Box>
    )
}

export default FileViewer