import React from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const ErrorAlert = ({ open, onClose, message, type}) => {
    const severity = (['error', 'info', 'success', 'warning'].includes(type) ? type : 'info');

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} variant='filled' elevation={6} >
                {message}
            </Alert>
        </Snackbar>
    );
}
 
export default ErrorAlert;