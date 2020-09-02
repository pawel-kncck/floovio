import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
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
            <AddCircleOutlineIcon color='primary' />
        </IconButton>
        <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>New exercise</MenuItem>
            <MenuItem onClick={handleClose}>Add link</MenuItem>
            <MenuItem onClick={handleClose}>Upload new file</MenuItem>
        </Menu>
        </>
    );
}
 
export default ListOptions;