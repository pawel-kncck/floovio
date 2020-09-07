import React, { useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { deleteList } from '../../../BackendFunctions';
import RenameDialog from './RenameDialog';

const ListOptionsMenu = (props) => {
    const [renameDialogOpen, setRenameDialogOpen] = useState();

    const handleRenameDialogOpen = () => {
        setRenameDialogOpen(true);
        props.onClose();
    }

    const handleRenameDialogClose = () => {
        setRenameDialogOpen(false);
    }


    return (
        <>
        <Menu
            id="fade-menu"
            anchorEl={props.anchorEl}
            keepMounted
            open={props.open}
            onClose={props.onClose}
        >
            <MenuItem onClick={handleRenameDialogOpen}>Rename</MenuItem>
            {/* <MenuItem disabled onClick={props.onClose}>Duplicate</MenuItem> */}
            {/* <MenuItem disabled onClick={props.onClose}>Move up</MenuItem> */}
            {/* <MenuItem disabled onClick={props.onClose}>Move down</MenuItem> */}
            {/* <MenuItem disabled onClick={props.onClose}>Move to another course</MenuItem> */}
            <MenuItem onClick={() => deleteList(props.listId, props.courseId)}>Delete</MenuItem>
        </Menu>
        {renameDialogOpen ? <RenameDialog listId={props.listId} courseId={props.courseId} open={renameDialogOpen} close={handleRenameDialogClose} currentName={props.listData.name} /> : null}
        </>
    );
}
 
export default ListOptionsMenu;