import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        backgroundColor: props => (props.active) ? "#214489" : "#142952",
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: "#214489"
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
        color: "#fff",
    },
    icon: {
        flexGrow: 1,
        fontSize: "24px",
        margin: 0,
    },
    text: {
        fontSize: "12px",
        margin: 0,
    }
})

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