import React, { useState } from 'react';
import { Button, Divider, Paper } from '@material-ui/core';
import firebase from '../.Database/firebase';

const FireFunctions = () => {
    const [message, setMessage] = useState();

    const handleFunction = () => {
        const sayHello = firebase.functions().httpsCallable('sayHello');

        sayHello().then(response => {
            setMessage(response);
        })
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleFunction}>Test</Button>
            <Divider />
            <Paper elevation={3}>
                {message}
            </Paper>
        </div>
    );
}
 
export default FireFunctions;