import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import firebase from '../../.Database/firebase';
import Title from './LessonTitle';
import Date from './LessonDate';
import SaveButton from './SaveButton';
import { connect } from 'react-redux';
import ModeSwitch from './ModeSwitch';
import StudentSelector from './StudentSelector';

const useStyles = makeStyles({
    header: {
        display: 'flex',
        alignItems: "center"
    },
    titleContainer: {
        flexGrow: 1,
    },
    inputFields: {
        margin: "0 20px"
    }
})

const LessonHeader = (props) => {
    const classes = useStyles();
    const [userRole, setUserRole] = useState('student');

    useEffect(() => {
        if (props.roles && firebase.auth().currentUser) {
            if (props.roles.editors.includes(firebase.auth().currentUser.uid)) {
                setUserRole('editor')
            } else if (props.roles.teachers.includes(firebase.auth().currentUser.uid)) {
                setUserRole('teacher')
            } else if (props.roles.students.includes(firebase.auth().currentUser.uid)) {
                setUserRole('student')
            }
        }
    })

    return (
        <>
        <div className={classes.header}>
            <div className={classes.titleContainer}>
                <Title />
            </div>
            <div className={classes.inputFields}>
                {(userRole !== 'student') ? <ModeSwitch userRole={userRole} /> : null}
            </div>
            <div className={classes.inputFields}>
                <Date />
            </div>
            <div className={classes.saveButtonContainer}>
                <SaveButton courseId={props.courseId} lessonId={props.lessonId} />
            </div>
        </div>
        {(userRole !== 'student') ? <StudentSelector /> : null}
        </>
    );
}

const mapStateToProps = state => {
    return {
        mode: state.lesson.lessonMode,
        title: state.lesson.lessonData.title,
        roles: state.course.data.roles,
    }
};

export default connect(mapStateToProps,null)(LessonHeader);