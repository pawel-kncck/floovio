import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorAlert = (props) => {
    // const [open, setOpen] = useState(true);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //       return;
    //     }
    
    //     setOpen(false);
    // };

    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity="error">
                {props.message}
            </Alert>
        </Snackbar>
    );
}
 
export default ErrorAlert;