import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import DeleteButton from './DeleteButton';

const useStyles = makeStyles(theme => ({
    activeUserMsg: {
        margin: '7px',
        padding: '12px',
        minWidth: '70px',
        maxWidth: '80%',
        color: theme.palette.common.offWhite,
        backgroundColor: theme.palette.primary.dark,
        boxShadow: theme.shadows[3],
        fontSize: '13px',
        borderRadius: '10px',
        transition: 'box-shadow 0.2s',
        '&:hover': {
            boxShadow: theme.shadows[6],
        },
        position: "relative",
    },
    otherUserMsg: {
        margin: '7px',
        padding: '12px',
        minWidth: '70px',
        maxWidth: '80%',
        color: '#555',
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[3],
        fontSize: '13px',
        borderRadius: '10px',
        transition: 'box-shadow 0.2s',
        '&:hover': {
            boxShadow: theme.shadows[6],
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
}));

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