import React from 'react'; 
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { deleteList } from '../../../BackendFunctions';

const DeleteConformation = ({ close, listId, courseId }) => {

    const handleDelete = () => {
        deleteList(listId, courseId);
    }

    return (
        <Dialog open={true} onClose={close}>
            <DialogTitle>
                Do you want to permanently delete this lesson?
            </DialogTitle>
            <DialogContent>
                This lesson will be permanently deleted. Are you sure you want to continue?
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={close}>Go back</Button>
                <Button 
                    variant='outlined'
                    onClick={handleDelete}
                    startIcon={<WarningIcon />}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default DeleteConformation;