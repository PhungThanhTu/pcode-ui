import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const AvatarSx = {
    position: 'absolute',
    top: "-20%",
    right: '5%',
    height: '75px',
    width: '75px'
}
const CardSx = {
    minWidth: 320,
    border: 'solid 1px black'
}
const CardContentSx = { 
    position: 'relative',
    paddingTop: '50%' ,
    borderTop: 'solid 1px black',
    borderBottom: 'solid 1px black'
}
const CardActionSx = {
    alignItems: 'center',
    justifyContent: 'flex-end'
}
const CourseCard = () => {
    return (
        <Card sx={CardSx}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                
                title="OOP"
                subheader="Nguyen Hoang Thai Duong"
            />
            <CardContent sx={CardContentSx}>
                <Avatar sx={AvatarSx} />
            </CardContent>
            <CardActions
                disableSpacing
                sx={CardActionSx}>
                <IconButton >
                    <ShareIcon />
                </IconButton>
                <IconButton>
                    <ExpandMoreIcon />
                </IconButton>

            </CardActions>
        </Card>
    );
};

export default CourseCard;
