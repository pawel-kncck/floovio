import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, makeStyles } from '@material-ui/core';
import firebase from '../.Database/firebase';
import { Redirect, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as actions from '../.Store/auth.actions';
import * as routes from '../.Application/routes';
import { connect } from 'react-redux';
import PasswordResetDialog from './PasswordResetDialog';
import Alert from '../.Alerts/ErrorAlert';

const useStyles = makeStyles({
    textField: {
        margin: '0'
    },
    button: {
        margin: '20px 0 20px 0'
    },
    title: {
        textAlign: 'center',
        margin: '0 0 10px 0',
        fontSize: '36px',
        color: '#555',
    },
    form: {
        maxWidth: '300px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
    },
    formContainer: {
        padding: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPasswordLink: {
        display: 'block',
        margin: '30px 0 0 0 ',
    },
    forgotText: {
        color: '#C77',
        fontSize: '12px',
        '&:hover': {
          cursor: 'pointer',
          color: '#F77',
          fontWeigth: 500,
       }

    }
})

const LoginPage = (props) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [resetDialogOpen, setResetDialogOpen] = useState(false);
    const classes = useStyles();

    const isInvalid = (email === '' || password === '');

    const history = useHistory();

    useEffect(() => {
        const appName = process.env.REACT_APP_TITLE;
        document.title = appName + ' | Login';
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onLogin(email, password);
        history.push(routes.HOME);
    };

    const handleForgetPasswordClick = () => {
        setResetDialogOpen(true);
    }

    const handleResetDialogClose = () => {
        setResetDialogOpen(false);
    }

    return (
        <>
        <div className={classes.formContainer}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <h1 className={classes.title}>Login</h1>
                <TextField type="email" id="email" name="email" label="Email" className={classes.textField} fullWidth onChange={(e) => setEmail(e.target.value)}></TextField>
                <TextField type="password" id="password" name="password" label="Password" className={classes.textField} fullWidth onChange={(e) => setPassword(e.target.value)}></TextField>
                <div className={classes.forgotPasswordLink}><span className={classes.forgotText} onClick={handleForgetPasswordClick}>Forgot password?</span></div>
                <Button type="submit" variant="contained" color="primary" disabled={isInvalid} className={classes.button}>Sign in</Button>
                <Typography color='textPrimary' variant='body2'>
                    Don't have an account yet? <NavLink to='/signup'>Go to sign up page!</NavLink>
                </Typography>
            </form>
        </div>
        <PasswordResetDialog open={resetDialogOpen} close={handleResetDialogClose} />
        <Alert open={Boolean(props.error)} onClose={props.clearError} message={(props.error) ? props.error.message : ''} />
        </>
    );
};

const mapStateToProps = state => {
    return {
        error: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password)),
        clearError: () => dispatch(actions.clearError())
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);