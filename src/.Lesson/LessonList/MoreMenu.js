import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteConfirmation from './DeleteConfirmation';

const ITEM_HEIGHT = 48;

const useStyles = makeStyles({
    menuItem: {
        fontSize: "13px"
    }
})

const MoreMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState();
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const open = Boolean(anchorEl);
    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteConfClose = () => {
        setDeleteConfirmOpen(false);
        setAnchorEl(null);
    };

    const handleDeleteConfOpen = () => {
        setDeleteConfirmOpen(true);
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="more-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 1,
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={handleDeleteConfOpen} className={classes.menuItem}>Delete</MenuItem>
            </Menu>
            <DeleteConfirmation open={deleteConfirmOpen} close={handleDeleteConfClose} courseId={props.courseId} lessonId={props.lessonId} />
        </div>
    );
}
 
export default MoreMenu;