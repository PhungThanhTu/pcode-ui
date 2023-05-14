import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { componentStyle } from '@/style/Variables';

interface PropsWithChildrenOnly {
    title: string;
    right: React.ReactNode;
    left: React.ReactNode;
    children: React.ReactNode;
}

const DocumentTabLayout = (props: PropsWithChildrenOnly) => {
    const { title, right, left, children } = props

    return (
        <Stack flexDirection="column" rowGap={1} minHeight="100%" maxHeight={"inherit"}>
            <Box sx={componentStyle}>
                <Typography variant="h6" >{title} </Typography>
            </Box>
            <Stack
                flexDirection="row"
                minHeight="635px"
                maxHeight="635px"
                width="100%"
                columnGap={1}
                alignItems={'flex-start'}
                justifyContent={'center'}
            >
                <Box>
                    {
                        left
                    }
                </Box>
                <Box>
                    {
                        right
                    }
                </Box>
            </Stack>
            <Box>
                {
                    children
                }
            </Box>
        </Stack>
    )
}

export default DocumentTabLayout