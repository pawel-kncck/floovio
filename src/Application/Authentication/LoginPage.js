import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, makeStyles } from '@material-ui/core';
import firebase from '../../firebase';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as actions from '../../Store/auth.actions';
import { connect } from 'react-redux';

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

const LoginPage = (props) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);
    const classes = useStyles();

    const isInvalid = (email === '' || password === '');

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onLogin(email, password);
        history.push("/")
    };

    return (
        <Grid container>
            <Grid item sm/>
            <Grid item sm>
                <Typography variant="h1" className={classes.title}>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField type="email" id="email" name="email" label="Email" className={classes.textField} fullWidth onChange={(e) => setEmail(e.target.value)}></TextField>
                    <TextField type="password" id="password" name="password" label="Password" className={classes.textField} fullWidth onChange={(e) => setPassword(e.target.value)}></TextField>
                    <Button type="submit" variant="contained" color="primary" disabled={isInvalid} className={classes.button}>Sign in</Button>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password))
    }
}
 
export default connect(null,mapDispatchToProps)(LoginPage);