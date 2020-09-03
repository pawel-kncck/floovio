import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { createNewList } from './BackendFunctions';

const NewListDialog = (props) => {
    const [name, setName] = useState('');
    const isValid = Boolean(name)

    const handleClose = () => {
        props.close();
        setName('');
    }

    const handleSave = () => {
        createNewList(props.courseId, name, props.user)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })

    }

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle>Create new list</DialogTitle>
            <DialogContent style={{ marginBottom: '30px' }}>
                <TextField
                    id='list-name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label='List name'
                />
            </DialogContent>
            <DialogActions>
                <Button color='secondary' size='small' variant='outlined' onClick={handleClose}>Cancel</Button>
                <Button disabled={!isValid} color='primary' size='small' variant='outlined' onClick={handleSave}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default NewListDialog;