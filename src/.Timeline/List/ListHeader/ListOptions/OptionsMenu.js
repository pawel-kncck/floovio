import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

const ListOptionsMenu = (props) => {
    return (
        <Menu
            id="fade-menu"
            anchorEl={props.anchorEl}
            keepMounted
            open={props.open}
            onClose={props.onClose}
        >
            <MenuItem onClick={props.onClose}>Rename</MenuItem>
            <MenuItem onClick={props.onClose}>Duplicate</MenuItem>
            <MenuItem onClick={props.onClose}>Move up</MenuItem>
            <MenuItem onClick={props.onClose}>Move down</MenuItem>
            <MenuItem onClick={props.onClose}>Move to another course</MenuItem>
            <MenuItem onClick={props.onClose}>Delete</MenuItem>
        </Menu>
    );
}
 
export default ListOptionsMenu;