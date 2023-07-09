
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BoxModalSx } from '@/style/BoxSx';
import { CourseScoreDetail } from '@/types/course.type';
import DataGridListItems from '../DataGridListItems';

interface CourseScoreDetailModalProps {

    open: boolean;
    onCancel: Function;
    list: Array<CourseScoreDetail>;
}

const CourseScoreDetailModal = (props: CourseScoreDetailModalProps) => {

    const { open, onCancel, list } = props;

    return (
        <Modal open={open} onClose={() => onCancel()} >
            <Box sx={BoxModalSx}>
                <Typography variant="h5" component="h2">
                    Score Detail
                </Typography>

                <Box width="100%" height="60%">
                    <DataGridListItems
                        columns={["Title", "Score"]}
                        onSelected={() => { }}
                        rows={list}
                    />
                </Box>

            </Box>
        </Modal>
    )
}

export default CourseScoreDetailModal