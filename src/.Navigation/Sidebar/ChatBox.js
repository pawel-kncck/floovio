import React from 'react';
import { makeStyles, Divider } from '@material-ui/core';
import SidebarContainerHeader from './SidebarHeader';
import Chat from '../../.Messages/Messages';

const useStyles = makeStyles(theme => ({
    root: {
        width: "330px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        boxShadow: theme.shadows[3]
    },
}))

const ChatBox = ({ courseId, onWrap }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <SidebarContainerHeader title='Chat' onWrap={onWrap} />
            <Divider />
            <div>
                <Chat courseId={courseId} />
            </div>
        </div> 
    );
}
 
export default ChatBox;