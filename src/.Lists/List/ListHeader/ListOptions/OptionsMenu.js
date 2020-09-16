import React, { useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import RenameDialog from './RenameDialog';
import CopyDialog from './CopyDialog';
import DeleteConfirmation from './DeleteConfirmation';

const ListOptionsMenu = (props) => {
    const [renameDialogOpen, setRenameDialogOpen] = useState();
    const [copyDialogOpen, setCopyDialogOpen] = useState();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState();

    const handleRenameDialogOpen = () => {
        setRenameDialogOpen(true);
        props.onClose();
    }

    const handleRenameDialogClose = () => {
        setRenameDialogOpen(false);
    }

    const handleCopyDialogClose = () => {
        setCopyDialogOpen(false);
    }

    const handleCopyDialogOpen = () => {
        setCopyDialogOpen(true);
        props.onClose();
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    }

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
        props.onClose();
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
                <MenuItem onClick={handleCopyDialogOpen}>Copy to another course</MenuItem>
                <MenuItem onClick={handleDeleteDialogOpen}>Delete</MenuItem>
            </Menu>
            {renameDialogOpen ? <RenameDialog listId={props.listId} courseId={props.courseId} close={handleRenameDialogClose} currentName={props.listData.name}/> : null}
            {copyDialogOpen ? <CopyDialog listId={props.listId} courseId={props.courseId} close={handleCopyDialogClose}/> : null}
            {deleteDialogOpen ? <DeleteConfirmation listId={props.listId} courseId={props.courseId} close={handleDeleteDialogClose}/> : null}
        </>
    );
}
 
export default ListOptionsMenu;