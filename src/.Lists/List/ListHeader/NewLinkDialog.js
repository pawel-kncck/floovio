import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { createNewLinkItem } from '../../BackendFunctions';

const NewLinkDialog = (props) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const isValid = Boolean(name) && Boolean(url)

    const handleClose = () => {
        props.close();
        setName('');
        setUrl('');
    }

    const handleAdd = () => {
        createNewLinkItem(props.listId, props.courseId, props.user, name, url, 'link')
            .then(res => {
                console.log(res);
                setName('');
                setUrl('');
            })
            .catch(err => {
                console.error(err);
            })
        props.close();
    }

    return (
        <Dialog open={props.open} onClose={props.close} style={{ width: '500px' }}>
            <DialogTitle>Add new link</DialogTitle>
            <DialogContent style={{ marginBottom: '30px' }}>
                <TextField
                    id='link-name'
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label='Item name'
                />
                <TextField
                    id='url'
                    fullWidth
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    label='Url'
                />
            </DialogContent>
            <DialogActions>
                <Button color='secondary' size='small' variant='outlined' onClick={handleClose}>Cancel</Button>
                <Button disabled={!isValid} color='primary' size='small' variant='outlined' onClick={handleAdd}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default NewLinkDialog;