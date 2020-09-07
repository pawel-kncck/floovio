import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import DeleteButton from './DeleteButton';

const useStyles = makeStyles({
    activeUserMsg: {
        margin: '7px',
        padding: '12px',
        minWidth: '70px',
        maxWidth: '80%',
        color: '#fafafa',
        backgroundColor: '#3f51b5',
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
        fontSize: '13px',
        borderRadius: '3px',
        transition: 'box-shadow 0.2s',
        '&:hover': {
            boxShadow: '1px 1px 3px 2px rgba(0, 0, 0, 0.1)',
        },
        position: "relative",
    },
    otherUserMsg: {
        margin: '7px',
        padding: '12px',
        minWidth: '70px',
        maxWidth: '80%',
        color: '#555',
        backgroundColor: '#fff',
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
        fontSize: '13px',
        borderRadius: '3px',
        transition: 'box-shadow 0.2s',
        '&:hover': {
            boxShadow: '1px 1px 3px 2px rgba(0, 0, 0, 0.1)',
        },
        position: "relative",
    },
    activeUserContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingRight: '20px',
        width: '100%',
    },
    otherUserContainer: {
        display: 'flex',
        width: '100%',
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
    const isOwnMessage = (props.msg.user === props.currentUser.uid)
    const outerClass = (isOwnMessage ? classes.activeUserContainer : classes.otherUserContainer);
    const messageClass = (isOwnMessage ? classes.activeUserMsg : classes.otherUserMsg);

    const toggleHover = () => {
        setHover(!hover);
    }

    return (
        <div className={outerClass}>
            <div className={messageClass} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                {(hover) ? <DeleteButton msg={props.msg} courseId={props.courseId} /> : null}
                {props.body}
            </div>
        </div>
    );
}
 
export default ChatItem;