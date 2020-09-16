import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { renameList } from '../../../BackendFunctions';

const RenameDialog = (props) => {
    const [name, setName] = useState(props.currentName);

    const handleSave = () => {
        renameList(props.listId, props.courseId, name);
        props.close();
    }

    return (
        <Dialog open={true} onClose={props.close}>
            <DialogTitle>Change list name</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    label="List name"
                />
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color='primary' size='small' onClick={props.close}>Cancel</Button>
                <Button 
                    variant='contained' 
                    color='primary' 
                    size='small' 
                    onClick={handleSave}
                >Save</Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default RenameDialog;