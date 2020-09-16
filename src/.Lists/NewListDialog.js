import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from '@material-ui/core';
import { createNewList } from './BackendFunctions';

const NewListDialog = (props) => {
    const [name, setName] = useState('');
    const isValid = Boolean(name)
    const [error, setError] = useState(null);

    const handleClose = () => {
        props.close();
        setName('');
    }

    const handleSave = () => {
        createNewList(props.courseId, name, props.user)
            .then(res => {
                console.log(res);
                props.close();
                setName('');
            })
            .catch(err => {
                console.error(err);
                setError(err);
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
                {error ? <Typography color='error'>{error}</Typography> : null }

            </DialogContent>
            <DialogActions>
                <Button color='secondary' size='small' variant='outlined' onClick={handleClose}>Cancel</Button>
                <Button disabled={!isValid} color='primary' size='small' variant='outlined' onClick={handleSave}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default NewListDialog;