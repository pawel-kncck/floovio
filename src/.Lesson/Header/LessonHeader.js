import React from 'react';
import { makeStyles } from '@material-ui/core';
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

    return (
        <>
        <div className={classes.header}>
            <div className={classes.titleContainer}>
                <Title />
            </div>
            <div className={classes.inputFields}>
                <ModeSwitch />    
            </div>
            <div className={classes.inputFields}>
                <Date />
            </div>
            <div className={classes.saveButtonContainer}>
                <SaveButton courseId={props.courseId} lessonId={props.lessonId} />
            </div>
        </div>
        {(props.mode === 'check') ? <StudentSelector /> : null}
        </>
    );
}

const mapStateToProps = state => {
    return {
        mode: state.lesson.lessonMode,
        title: state.lesson.lessonData.title,
    }
};

export default connect(mapStateToProps,null)(LessonHeader);