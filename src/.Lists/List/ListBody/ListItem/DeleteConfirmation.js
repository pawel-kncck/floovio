import React from 'react'; 
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { deleteItem } from '../../../BackendFunctions';

const ItemDeleteConformation = ({ close, itemId, listId, courseId }) => {

    const handleDelete = () => {
        deleteItem(itemId, listId, courseId);
        close();
    }

    return (
        <Dialog open={true} onClose={close}>
            <DialogTitle>
                Do you want to permanently delete this item?
            </DialogTitle>
            <DialogContent>
                This item will be permanently deleted. Are you sure you want to continue?
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
 
export default ItemDeleteConformation;