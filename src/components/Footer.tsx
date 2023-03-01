import { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
    const FooterBoxSx = {
        width: "100%",
        height: "auto",
        backgroundColor: "secondary",
        paddingTop: "1rem",
        paddingBottom: "1rem",
    }
    return (
        <Box
            sx={FooterBoxSx}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Typography color="black" variant="h5">
                            @{`${new Date().getFullYear()}`}, PLP - all rights preserved
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" variant="subtitle1">
                            Phung Thanh Tu | Nguyen Hoang Thai Duong
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
export default Footer;

