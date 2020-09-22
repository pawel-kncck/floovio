import React, { useState } from 'react';
import { makeStyles, Divider, Slide } from '@material-ui/core';
import SidebarButton from './SidebarButton';
import SidebarContainerHeader from './SidebarHeader';
import LessonIcon from '@material-ui/icons/List';
import ChatIcon from '@material-ui/icons/ForumOutlined';
import MediaIcon from '@material-ui/icons/PermMediaOutlined';
import NoteIcon from '@material-ui/icons/Note';
import SettingsIcon from '@material-ui/icons/Settings';
import StudentsIcon from '@material-ui/icons/PeopleAltOutlined';
import Chat from '../../.Messages/Messages';
import LessonList from '../../.Lesson/LessonList/LessonList';
import MediaViewer from '../../.Media/MediaSidebar';
import * as routes from '../../.Application/routes';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../../.Database/firebase';
import ChatBox from './ChatBox';

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
    },
    buttonsTop: {
        flexGrow: 1
    },
    buttonsBottom: {
        marginBottom: '60px',
    }
}));

const Sidebar = (props) => {
    const classes = useStyles();
    const [chatOpen, setChatOpen] = useState(false);
    const courseId = props.match.params.id;

    const canUserEdit = (props.roles) ? props.roles.teachers.includes(firebase.auth().currentUser.uid) || props.roles.editors.includes(firebase.auth().currentUser.uid) : null;

    const toggleChatOpen = () => {
        setChatOpen(!chatOpen);
    }

    const handleClose = () => {
        setChatOpen(false);
    }

    return (
        <div className={classes.root}>
            <div className={classes.sidebar}>
                <div className={classes.buttonsTop}>
                    <NavLink to={`/course/${courseId}/lessons`}><SidebarButton text='Lessons' icon={<LessonIcon />} active={false} /></NavLink>
                    <NavLink to={`/course/${courseId}/notes`}><SidebarButton text='Notes' icon={<NoteIcon />} active={false} /></NavLink>
                    <SidebarButton text='Chat' icon={<ChatIcon />} click={() => toggleChatOpen()} active={chatOpen} />
                </div>
                <div className={classes.buttonsBottom}>
                    { canUserEdit ? <NavLink to={`/course/${courseId}/media`}><SidebarButton text='Media' icon={<MediaIcon />} active={false} /></NavLink> : null }
                    <NavLink to={`/course/${courseId}/settings`}><SidebarButton text='Settings' icon={<SettingsIcon />} active={false} /></NavLink>
                </div>
            </div>
            {(chatOpen) ? <ChatBox courseId={courseId} onWrap={handleClose} /> : null}
        </div>
        
    );
}

const mapStateToProps = state => {
    return {
        roles: state.course.data.roles,
    }
}

export default connect(mapStateToProps)(Sidebar);