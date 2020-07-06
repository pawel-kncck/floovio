import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, makeStyles } from '@material-ui/core';
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as actions from '../.Store/auth.actions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    textField: {
        margin: '20px 0'
    },
    button: {
        margin: '20px 0 0 0'
    },
    title: {
        textAlign: 'center',
        margin: 0,
    },
    formContainer: {
        display: 'flex',
        marginTop: '30px',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '30px',
        border: '1px solid #ccc',
        borderRadius: '10px'
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
                <div className={classes.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <h1 className={classes.title}>Login</h1>
                        <TextField type="email" id="email" name="email" label="Email" className={classes.textField} fullWidth onChange={(e) => setEmail(e.target.value)}></TextField>
                        <TextField type="password" id="password" name="password" label="Password" className={classes.textField} fullWidth onChange={(e) => setPassword(e.target.value)}></TextField>
                        <Button type="submit" variant="contained" color="primary" disabled={isInvalid} className={classes.button}>Sign in</Button>
                    </form>
                </div>
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