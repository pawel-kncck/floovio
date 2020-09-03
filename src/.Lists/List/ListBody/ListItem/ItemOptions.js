import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { deleteItem } from '../../../BackendFunctions';

const ListOptions = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
        <IconButton aria-label="item options" size="small" onClick={handleClick}>
            <MoreHorizIcon />
        </IconButton>
        <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
        >
            <MenuItem disabled onClick={handleClose}>Edit</MenuItem>
            <MenuItem disabled onClick={handleClose}>Duplicate</MenuItem>
            <MenuItem disabled onClick={handleClose}>Move to another list</MenuItem>
            <MenuItem onClick={() => deleteItem(props.itemId, props.listId, props.courseId)}>Delete</MenuItem>
        </Menu>
        </>
    );
}
 
export default ListOptions;