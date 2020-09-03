import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import NewLinkDialog from './NewLinkDialog';

const ListOptions = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [newLinkDialogOpen, setNewLinkDialogOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNewLinkDialogOpen = () => {
        setNewLinkDialogOpen(true);
    }

    const handleNewLinkDialogClose = () => {
        setNewLinkDialogOpen(false);
        setAnchorEl(null);
    }

    return (
        <>
        <IconButton aria-label="item options" size="small" onClick={handleClick}>
            <AddCircleOutlineIcon color='primary' />
        </IconButton>
        <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
        >
            <MenuItem disabled onClick={handleClose}>New exercise</MenuItem>
            <MenuItem onClick={handleNewLinkDialogOpen}>Add link</MenuItem>
            <MenuItem disabled onClick={handleClose}>Upload new file</MenuItem>
        </Menu>
        <NewLinkDialog open={newLinkDialogOpen} close={handleNewLinkDialogClose} listData={props.listData} listId={props.listId} courseId={props.courseId} user={props.user} />
        </>
    );
}
 
export default ListOptions;