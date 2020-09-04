import React, { useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import NewLinkDialog from './NewLinkDialog';
import firebase, { storage } from '../../../.Database/firebase';
import { makeCustomId } from '../../../.Utilities/Utilities';
import { createNewFileItem } from '../../BackendFunctions';
import FloovioDialog from '../../../.Exercise/Editor/FloovioDialog';
import { createFloovio } from '../../../.Store/floovio.actions';
import { connect } from 'react-redux';

const ListOptions = ({ listId, courseId, user, listData, ...props }) => {
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

    const handleExerciseDialogOpen = () => {
        props.createExercise(listId);
        setAnchorEl(null);
    }

    const handleUploadClick = () => {
        document.getElementById(`fileupload-${listId}`).click();
        setAnchorEl(null);
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
            <MenuItem onClick={handleExerciseDialogOpen}>New exercise</MenuItem>
            <MenuItem onClick={handleNewLinkDialogOpen}>Add link</MenuItem>
            <input 
                        type="file" 
                        id={`fileupload-${listId}`}
                        style={{ display: 'none' }}
                        onChange={(e) => firebaseImageUpload(e.target.files[0])} />
            <MenuItem onClick={handleUploadClick}>Upload new file</MenuItem>
        </Menu>
        <NewLinkDialog open={newLinkDialogOpen} close={handleNewLinkDialogClose} listData={listData} listId={listId} courseId={courseId} user={user} />
        <FloovioDialog courseId={courseId} user={user} />
        </>
    );
}

const mapStateToProps = state => {
    return {
        open: state.floovio.open,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createExercise: (value) => {dispatch(createFloovio(value))},
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ListOptions);