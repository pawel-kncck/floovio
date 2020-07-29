import React, { useState } from 'react';
import { makeStyles, Divider, Slide } from '@material-ui/core';
import SidebarButton from './SidebarButton';
import SidebarContainerHeader from './SidebarHeader';
import ListIcon from '@material-ui/icons/List';
import ChatIcon from '@material-ui/icons/ForumOutlined';
import StudentsIcon from '@material-ui/icons/PeopleAltOutlined';
import Chat from '../../.Notes/Notes';
import LessonList from '../../.Lesson/LessonList/LessonList';

const useStyles = makeStyles({
    root: {
        height: "100vh",
        display: "flex",
    },
    sidebar: {
        width: "80px",
        backgroundColor: "#142952",
        display: "flex",
        flexDirection: "column",
    },
    sideContainer: {
        width: "280px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        boxShadow: "0px 1px 1px #ccc",
    },
    header: {
        display: "flex",
        padding: "10px",
        height: "40px",
        alignItems: "center",
    },
    title: {
        flexGrow: 1
    }
})

const Sidebar = (props) => {
    const classes = useStyles();
    const [activeView, setActiveeView] = useState(-1);

    const viewsArray = [
        {text: "Lessons", icon: <ListIcon />, component: <LessonList courseId={props.match.params.id} />},
        {text: "Chat", icon: <ChatIcon />, component: <Chat courseId={props.match.params.id} />},
        {text: "Students", icon: <StudentsIcon />, component: null}
    ];

    const toggleOpen = (index) => {
        (activeView === index) 
            ? setActiveeView(-1)
            : setActiveeView(index);
    }

    const handleClose = () => {
        setActiveeView(-1)
    }

    return (
        <div className={classes.root}>
            <div className={classes.sidebar}>
                {viewsArray.map((el,index) => (
                    <SidebarButton key={index} text={el.text} icon={el.icon} click={() => toggleOpen(index)} active={(activeView === index)} />
                ))}
            </div>
            {(activeView !== -1) 
                ?   <div className={classes.sideContainer}>
                        <SidebarContainerHeader title={viewsArray[activeView].text} onWrap={handleClose} />
                        <Divider />
                        <div className={classes.content}>
                            {viewsArray[activeView].component}
                        </div>
                    </div> 
                : null}
        </div>
        
    );
}
 
export default Sidebar;