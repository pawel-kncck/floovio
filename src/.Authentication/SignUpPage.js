import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, makeStyles } from '@material-ui/core';
import ErrorAlert from '../.Alerts/ErrorAlert';
import firebase from '../.Database/firebase';
import { useHistory } from 'react-router-dom';
import * as routes from '../.Application/routes';

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
    const [email, setEmail] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [alertOpen, setAlertOpen] = useState();
    const classes = useStyles();
    const history = useHistory();
    const [redirecting, setRedirecting] = useState(false);

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const isValid = (validateEmail(email) && email !== '' && password.length > 5 && password === confPassword)

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlertOpen(false);
    };

    const resetAllInputs = () => {
        setEmail('');
        setConfPassword('');
        setPassword('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
            .then(res => {
                resetAllInputs();
                history.push(routes.HOME);
            })
            .catch(err => {
                setError(err);
                setAlertOpen(true);
                console.log(err);
            });
    };

    return (
        <Grid container>
            <Grid item sm/>
            <Grid item sm>
                <Typography variant="h1" className={classes.title}>Sign up</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField type="email" id="email" name="email" label="Email" className={classes.textField} value={email} fullWidth onChange={(e) => setEmail(e.target.value)}></TextField>
                    <TextField type="password" id="password" name="password" label="Password" className={classes.textField} fullWidth value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
                    <TextField type="password" id="c-password" name="c-password" label="Confirm password" className={classes.textField} value={confPassword} fullWidth onChange={(e) => setConfPassword(e.target.value)}></TextField>
                    <Button type="submit" disabled={!isValid} variant="contained" color="primary" className={classes.button}>Create account</Button> 
                </form>
                <ErrorAlert message={error.message} open={alertOpen} onClose={handleAlertClose} />

            </Grid>
            <Grid item sm/>
        </Grid>
    );
}
 
export default LoginPage;