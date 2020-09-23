import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const ErrorAlert = (props) => {

    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}>
            <Alert onClose={props.onClose} elevation={6} severity="error" variant="filled">
                {props.message}
            </Alert>
        </Snackbar>
    );
}
 
export default ErrorAlert;