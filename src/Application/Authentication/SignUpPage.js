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
    const [email, setEmail] = useState(null);
    const [confEmail, setConfEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const classes = useStyles();

    const isValid = 
        confEmail === email &&
        email !== '' &&
        password !== ''

    const handleSubmit = (event) => {
        event.preventDefault();
        firebase.auth()
        .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                setEmail(null);
                setConfEmail(null);
                setPassword(null);
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
                    <TextField type="email" id="c-email" name="c-email" label="Confirm email" className={classes.textField} fullWidth onChange={(e) => setConfEmail(e.target.value)}></TextField>
                    <TextField type="password" id="password" name="password" label="Password" className={classes.textField} fullWidth onChange={(e) => setPassword(e.target.value)}></TextField>
                    <Button type="submit" disabled={isValid} variant="contained" color="primary" className={classes.button}>Create account</Button>
                </form>    
            </Grid>
            <Grid item sm/>
        </Grid>
    );
}
 
export default LoginPage;