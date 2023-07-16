import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import StarBorder from '@mui/icons-material/StarBorder';

import { useState, MouseEvent, useEffect } from 'react';
import { borderRadius } from '@/style/Variables';

interface ListItemsProps {
    subheader?: string;
    list: Array<ItemProps>;
}
interface ItemProps {
    actions: Array<ItemActions>;
    title: string;
    collapse?: JSX.Element;
    content?: any;
    click?: Function;
}
interface ItemActions {
    title: string;
    action: Function;
    icon: JSX.Element;
    color: any;
    type: string;
}
const ListItems = (props: ListItemsProps) => {

    const { subheader, list } = props
    const [open, setOpen] = useState(true);
    const [openItem, setOpenItem] = useState(-1);

    const handleClick = (index: number, extra: Function | null) => {

        if (extra) {
            extra()
            setOpenItem(index)
            setOpen(false)
        }
        else {
            if (openItem !== index) {
                setOpenItem(index)
            } else {
                setOpenItem(-1)
            }
        }
    };

    useEffect(() => {

        if (openItem != -1) {
            setOpen(true)
        }
    }, [openItem])

    return (
        <List
            sx={{ width: '100%' }}
            subheader={
                subheader ?
                    <ListSubheader component="div" sx={{ lineHeight: 'normal', padding: '16px', bgcolor: "inherit", position: 'relative' }} >
                        {subheader}
                    </ListSubheader>
                    : null
            }
        >
            {
                list.map((item, index) => {
                    return (
                        <ListItem sx={{ flexDirection: 'column' }} key={index}>
                            <ListItemButton
                                sx={{ width: '100%', padding: '8px', bgcolor: "#fff", borderRadius: index === openItem && open ? `${borderRadius} ${borderRadius} 0 0` : borderRadius }}
                                onClick={() => { item.click ? handleClick(index, item.click) : handleClick(index, null) }}
                                selected={index === openItem}
                            >
                                <ListItemText primary={item.title} />
                                {
                                    item.actions.map((itemAction, index) =>
                                        itemAction.type === "icon" ?
                                            <Tooltip title={itemAction.title} key={index}>
                                                <IconButton
                                                    color={itemAction.color}
                                                    edge="end"
                                                    onClick={(e: MouseEvent) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        itemAction.action();
                                                    }}>
                                                    {itemAction.icon}
                                                </IconButton>
                                            </Tooltip>
                                            :
                                            <Tooltip title={itemAction.title} key={index}>
                                                {
                                                    itemAction.icon
                                                }
                                            </Tooltip>
                                    )
                                }
                                {
                                    item.collapse ?
                                        open && index === openItem ? <ExpandLess /> : <ExpandMore />
                                        : null
                                }
                            </ListItemButton>
                            {
                                item.collapse ?
                                    <Collapse

                                        in={index === openItem}
                                        timeout="auto"
                                        unmountOnExit
                                        sx={{
                                            paddingTop: '10px',
                                            bgcolor: "#fff", width: '100%',
                                            height: '400px !important',
                                            '> *': {
                                                height: '100%'
                                            }
                                        }}
                                    >
                                        {
                                            item.collapse
                                        }
                                    </Collapse>
                                    :
                                    null
                            }

                        </ListItem>
                    )
                })
            }



        </List>
    )
}

export default ListItems
