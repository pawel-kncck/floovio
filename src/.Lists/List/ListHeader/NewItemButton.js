import React, { useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import NewLinkDialog from './NewLinkDialog';
import firebase, { storage } from '../../../.Database/firebase';
import { makeCustomId } from '../../../.Utilities/Utilities';
import { createNewFileItem } from '../../BackendFunctions';

const ListOptions = ({ listId, courseId, user, listData }) => {
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

    const handleUploadClick = () => {
        document.getElementById(`fileupload-${listId}`).click();
    }

    const firebaseImageUpload = (file) => {
        const fileId = makeCustomId();
        const storageRef = storage.ref(`/files/${fileId}`);

        storageRef.put(file)
            .then(() => {
                return storageRef.getDownloadURL()
            })
            .then(url => {
                createNewFileItem(listId, courseId, user, url, file.name, file.type, file.size)
                    .then(res => {
                        console.log(res);
                        console.log(`Item should be added to ${listId}`);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err)
            })
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
            <MenuItem disabled onClick={handleClose}>New exercise</MenuItem>
            <MenuItem onClick={handleNewLinkDialogOpen}>Add link</MenuItem>
            <input 
                        type="file" 
                        id={`fileupload-${listId}`}
                        style={{ display: 'none' }}
                        onChange={(e) => firebaseImageUpload(e.target.files[0])} />
            <MenuItem onClick={handleUploadClick}>Upload new file</MenuItem>
        </Menu>
        <NewLinkDialog open={newLinkDialogOpen} close={handleNewLinkDialogClose} listData={listData} listId={listId} courseId={courseId} user={user} />
        </>
    );
}
 
export default ListOptions;