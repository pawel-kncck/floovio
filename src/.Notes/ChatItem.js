import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import DeleteButton from './DeleteButton';

const useStyles = makeStyles({
    noteItem: {
        margin: '7px',
        padding: '12px',
        minWidth: '50px',
        maxWidth: '90%',
        color: '#555',
        backgroundColor: '#fff',
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
        display: 'inline-block',
        fontSize: '13px',
        borderRadius: '3px',
        transition: 'box-shadow 0.2s',
        '&:hover': {
            boxShadow: '1px 1px 3px 2px rgba(0, 0, 0, 0.1)',
        },
        position: "relative",
    },
    noteOuter: {
        display: 'block',
    },
    deleteButton: {
        zIndex: 150,
        top: 0,
        left: 0,
        position: "absolute", 
    }
})

const ChatItem = (props) => {
    const classes = useStyles();
    const [hover, setHover] = useState(false);

    const toggleHover = () => {
        setHover(!hover);
    }

    return (
        <div className={classes.noteOuter}>
            <div className={classes.noteItem} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                {(hover) ? <DeleteButton /> : null}
                {props.body}
            </div>
        </div>
    );
}
 
export default ChatItem;