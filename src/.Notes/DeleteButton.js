import React from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
    root: {
        zIndex: 150,
        top: 0,
        right: 0,
        position: "absolute",
        border: 0,
        outline: "none",
        backgroundColor: 'rgba(255, 255, 255, 0)',
        color: 'rgba(255, 255, 255, 0)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: 'rgba(0, 0, 0, 0.5)',
        },
        transition: 'all 0.2s',
        borderRadius: '50%',
        fontSize: '10px',
        padding: '2px',
    },
    iconButton: {
        margin: 0,
        padding: 0,
    }
})

const MessageDeleteButton = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <IconButton className={classes.iconButton}>
                <ExpandMoreIcon />
            </IconButton>
        </div>
    );
}
 
export default MessageDeleteButton;