import React, { useState } from 'react';
import { Dialog, DialogContent, TextField, Typography, DialogActions, Button, DialogTitle } from '@material-ui/core';
import { unlockTeacher, isTeacherCodeValid } from '../.Database/BackendFunctions';

const TeacherUnlockDialog = ({ close, user }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleUnlock = () => {
        if (isTeacherCodeValid(code)) {
            unlockTeacher(user, code)
                .then(res => {
                    console.log(res)
                    close();
                })
                .catch(err => { console.error(err) })
        } else {
            setError("Invalid code!");
        }
    }

    const handleChange = (event) => {
        setCode(event.target.value);
        setError('');
    }

    return (
        <Dialog open={true} onClose={close}>
            <DialogTitle>
                <Typography>
                    Insert code:
                </Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label='Code'
                    value={code}
                    onChange={(event) => handleChange(event)}
                 />
                 <Typography variant='body1' color='error'>
                    {error}
                 </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} size='small' variant='outlined' color='primary'>Cancel</Button>
                <Button onClick={handleUnlock} size='small' variant='contained' color='primary'>Unlock</Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default TeacherUnlockDialog;