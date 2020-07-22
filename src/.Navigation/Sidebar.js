import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import SidebarButton from './SidebarButton';
import ListIcon from '@material-ui/icons/List';
import ChatIcon from '@material-ui/icons/ForumOutlined';
import StudentsIcon from '@material-ui/icons/PeopleAltOutlined';

const useStyles = makeStyles({
    sidebar: {
        height: "100vh",
        width: "80px",
        backgroundColor: "#142952",
        display: "flex",
        flexDirection: "column",
    },
    sideContainer: {
        width: "250px",
        height: "100vh",
        backgroundColor: "#fff",
        boxShadow: "1px 1px 1px #ccc",
        position: "relative",
    }
})

const Sidebar = () => {
    const classes = useStyles();
    const [activeView, setActiveeView] = useState(-1);

    const toggleOpen = (index) => {
        (activeView === index) 
            ? setActiveeView(-1)
            : setActiveeView(index);
    }

    return (
        <>
            <div className={classes.sidebar}>
                <SidebarButton text="Lessons" icon={<ListIcon />} click={() => toggleOpen(0)} active={(activeView === 0)} />
                <SidebarButton text="Chat" icon={<ChatIcon />} click={() => toggleOpen(1)} active={(activeView === 1)} />
                <SidebarButton text="Students" icon={<StudentsIcon />} click={() => toggleOpen(2)} active={(activeView === 2)} />
            </div>
            {(activeView !== -1) 
                ? <div className={classes.sideContainer}></div> 
                : null}
        </>
        
    );
}
 
export default Sidebar;