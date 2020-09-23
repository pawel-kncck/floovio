import React from 'react';
import { Dialog, DialogTitle, DialogContentText, DialogActions, Button, DialogContent } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const MediaDeletePrompt = ({ onDelete, onCancel, open }) => {
    return (
        <Dialog open={open} onClose={onCancel} >
            <DialogTitle>
                Delete confirmation
            </DialogTitle>
            <DialogContent>
                <DialogContentText color='error'>
                    Are you sure, you want to remove this item?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size='small' variant='contained' color="primary" onClick={onCancel}>Cancel</Button>
                <Button size='small' variant='outlined' startIcon={<DeleteIcon />} onClick={onDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default MediaDeletePrompt;