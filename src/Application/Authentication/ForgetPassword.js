import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, makeStyles } from '@material-ui/core';
import firebase from '../../firebase';

const useStyles = makeStyles({
    textField: {
        margin: '20px'
    },
    button: {
        margin: '20px'
    },
    title: {
        marginTop: '20px'
    }
})

const LoginPage = () => {
    const [email,setEmail] = useState(null);
    const [error,setError] = useState(null);
    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        firebase.auth()
        .doPasswordReset(email)
            .then(() => {
                setEmail(null);
            })
            .catch(err => {
                setError(err);
            });
    };

    return (
        <Grid container>
            <Grid item sm/>
            <Grid item sm>
                <Typography variant="h1" className={classes.title}>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField type="email" id="email" name="email" label="Email" className={classes.textField} fullWidth onChange={(e) => setEmail(e.target.value)}></TextField>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>Send</Button>
                </form>    
            </Grid>
            <Grid item sm/>
        </Grid>
    );
}
 
export default LoginPage;