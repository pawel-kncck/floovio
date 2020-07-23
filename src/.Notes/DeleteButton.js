import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        zIndex: 150,
        top: 0,
        right: 0,
        position: "absolute",
        border: 0,
        outline: "none",
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '50%',
        fontSize: '10px',
        padding: '2px',
    }
})

const MessageDeleteButton = (props) => {
    const classes = useStyles();
    return (
        <button className={classes.root}>
            <DeleteForeverIcon />
        </button>
    );
}
 
export default MessageDeleteButton;