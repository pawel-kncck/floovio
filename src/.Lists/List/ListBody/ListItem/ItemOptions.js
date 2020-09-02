import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton, Menu, MenuItem } from '@material-ui/core';

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
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Duplicate</MenuItem>
            <MenuItem onClick={handleClose}>Move to another list</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
        </>
    );
}
 
export default ListOptions;