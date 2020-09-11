import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: props => (props.active) ? theme.palette.secondary.main : theme.palette.secondary.main,
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.secondary.light,
        },
        transition: "background 0.2s",
        display: "flex",
        width: "100%",
        border: 0,
        margin: 0,
        padding: 0,
        outline: "none",
    },
    leftStripe: {
        background: props => (props.active) ? "#fff" : "rgba(0, 0, 0, 0)",
        width: "3px",
        height: "100%",
    },
    main: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px 0",
        color: theme.palette.grey[900],
    },
    icon: {
        flexGrow: 1,
        fontSize: "28px",
        margin: 0,
    },
    text: {
        margin: 0,
    }
}));

const SidebarButton = (props) => {
    const classes = useStyles(props);

    return (
        <button className={classes.root}>
            <div className={classes.leftStripe}></div>
            <div className={classes.main} onClick={props.click}>
                <div className={classes.icon}>{props.icon}</div>
                <div className={classes.text}>{props.text}</div>
            </div>
        </button>
    );
}
 
export default SidebarButton;