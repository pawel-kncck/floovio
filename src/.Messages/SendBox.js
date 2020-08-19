import React, { useState } from 'react';
import { Paper, makeStyles, InputBase, Divider, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { sendMsg } from '../.Database/db.lesson';

const useStyles = makeStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginLeft: '10px',
    },
    divider: {
        height: '28px'
    },
    iconButton: {
        padding: '10px'
    }
})



const SendBox = (props) => {
    const classes = useStyles();
    const [msg,setMsg] = useState("");

    const handleSendClick = () => {
        if (msg !== "") {
            sendMsg(props.courseId,msg,props.user);
        }
        setMsg("");
    }

    const handlePressEnter = (event) => {
        event.preventDefault();
        if (msg !== "") {
            sendMsg(props.courseId,msg,props.user);
        }
        setMsg("");
    }

    return (
        <Paper component="form" className={classes.root} onSubmit={(e) => handlePressEnter(e)}>
            <InputBase 
                className={classes.input} 
                placeholder="Enter a new note" 
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                />
            <Divider className={classes.divider} orientation='vertical' />
            <IconButton 
                color="primary"
                className={classes.iconButton}
                aria-label="directions"
                onClick={() => handleSendClick()}
                >
                <SendIcon />
            </IconButton>
        </Paper>
    );
}
 
export default SendBox;