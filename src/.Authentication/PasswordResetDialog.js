import React, { useState } from 'react';
import { Button, TextField, makeStyles, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import firebase from '../.Database/firebase';

const useStyles = makeStyles({
    emailField: {
        margin: '0 20px 20px 20px',
        width: '200px'
    },
})

const PasswordResetDialog = (props) => {
    const [email,setEmail] = useState('');
    const isValid = (email !== '')
    const classes = useStyles();

    const handleSubmit = () => {
        var auth = firebase.auth();
        var emailAddress = email;

        auth.sendPasswordResetEmail(emailAddress)
            .then(() => {
                console.log("Reset email sent")
            })
            .catch(error => {
                console.error(error);
            });

        props.close();
        setEmail('');
    }

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle>Password reset</DialogTitle>
            <DialogContent>
                <TextField 
                    className={classes.emailField}
                    type="email" 
                    id="email" 
                    label="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    color="primary" 
                    variant="contained" 
                    size="medium" 
                    disabled={!isValid}
                    onClick={handleSubmit}
                    >Send reset link
                </Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default PasswordResetDialog;