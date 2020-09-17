import React, { useState } from 'react';
import { makeStyles, Divider, Slide } from '@material-ui/core';
import SidebarButton from './SidebarButton';
import SidebarContainerHeader from './SidebarHeader';
import LessonIcon from '@material-ui/icons/List';
import ChatIcon from '@material-ui/icons/ForumOutlined';
import MediaIcon from '@material-ui/icons/PermMediaOutlined';
import NoteIcon from '@material-ui/icons/Note';
import StudentsIcon from '@material-ui/icons/PeopleAltOutlined';
import Chat from '../../.Messages/Messages';
import LessonList from '../../.Lesson/LessonList/LessonList';
import MediaViewer from '../../.Media/MediaSidebar';
import * as routes from '../../.Application/routes';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../../.Database/firebase';

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        display: "flex",
        '& a': {
            textDecoration: 'none',
        },
        boxShadow: theme.shadows[3]
    },
    sidebar: {
        width: "80px",
        paddingTop: '20px',
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        flexDirection: "column",
    },
    sideContainer: {
        width: "330px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        boxShadow: theme.shadows[3]
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
}));

const Sidebar = (props) => {
    const classes = useStyles();
    const [activeView, setActiveeView] = useState(-1);

    const isEditor = (props.roles) ? props.roles.editors.includes(firebase.auth().currentUser.uid) : null;

    const viewsArray = [
        // {text: "Lessons", icon: <ListIcon />, component: <LessonList courseId={props.match.params.id} />, path: null},
        {text: "Lessons", icon: <LessonIcon />, component: null, path: `/course/${props.match.params.id}/lessons`},
        {text: "Chat", icon: <ChatIcon />, component: <Chat courseId={props.match.params.id} />, path: null},
        {text: "Notes", icon: <NoteIcon />, component: null, path: `/course/${props.match.params.id}/notes`},
        {text: "Media", icon: <MediaIcon />, component: null, path: `/course/${props.match.params.id}/media`},
        // (isEditor) ? {text: "Media", icon: <MediaIcon />, component: <MediaViewer courseId={props.match.params.id} />, path: null} : null,
        // {text: "Students", icon: <StudentsIcon />, component: null, path: null},
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
                    (el !== null) 
                    ?   (el.path === null)
                            ?   <SidebarButton key={index} text={el.text} icon={el.icon} click={() => toggleOpen(index)} active={(activeView === index)} />
                            :   <NavLink key={index} to={el.path}><SidebarButton text={el.text} icon={el.icon} active={(activeView === index)} /></NavLink>
                    : null
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

const mapStateToProps = state => {
    return {
        roles: state.course.data.roles,
    }
}

export default connect(mapStateToProps)(Sidebar);