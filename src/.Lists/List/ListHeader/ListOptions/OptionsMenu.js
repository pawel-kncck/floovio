import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { deleteList } from '../../../BackendFunctions';

const ListOptionsMenu = (props) => {
    return (
        <Menu
            id="fade-menu"
            anchorEl={props.anchorEl}
            keepMounted
            open={props.open}
            onClose={props.onClose}
        >
            <MenuItem disabled onClick={props.onClose}>Rename</MenuItem>
            <MenuItem disabled onClick={props.onClose}>Duplicate</MenuItem>
            <MenuItem disabled onClick={props.onClose}>Move up</MenuItem>
            <MenuItem disabled onClick={props.onClose}>Move down</MenuItem>
            <MenuItem disabled onClick={props.onClose}>Move to another course</MenuItem>
            <MenuItem onClick={() => deleteList(props.listId, props.courseId)}>Delete</MenuItem>
        </Menu>
    );
}
 
export default ListOptionsMenu;