import React from 'react';
import { makeStyles, IconButton, Menu, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { removeMsg } from '../.Database/db.lesson';

const useStyles = makeStyles({
    root: {
        zIndex: 150,
        top: 0,
        right: 0,
        position: "absolute",
        border: 0,
        outline: "none",
        backgroundColor: 'rgba(255, 255, 255, 0)',
        color: 'rgba(255, 255, 255, 0)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: 'rgba(0, 0, 0, 0.5)',
        },
        transition: 'all 0.2s',
        borderRadius: '50%',
        fontSize: '10px',
        padding: '2px',
    },
    iconButton: {
        margin: 0,
        padding: 0,
    }
})

const ITEM_HEIGHT = 48;

const MessageDeleteButton = ({ msg, courseId }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteClick = () => {
        setAnchorEl(null);
        removeMsg(courseId, msg);
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleClick}
                className={classes.iconButton}
            >
                <ExpandMoreIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                },
                }}
            >
                <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
        </div>
    );
}
 
export default MessageDeleteButton;