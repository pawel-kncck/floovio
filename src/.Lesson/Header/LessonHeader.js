import React from 'react';
import { makeStyles } from '@material-ui/core';
import Breadcrumbs from './Breadcrumbs';
import Title from './LessonTitle';
import Date from './LessonDate';
import SaveButton from './SaveButton';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        display: 'grid',
        gridTemplateColumns: '65% auto',
        gridTemplateRows: '50px 70px',
    },
    rightItem: {
        justifySelf: 'end',
    }
})

const LessonHeader = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Breadcrumbs courseName="Placeholder course name" lessonName={props.title} />
            <div className={classes.rightItem}>
                <SaveButton mode={props.mode} courseId={props.courseId} lessonId={props.lessonId} />
            </div>
            <Title />
            <div className={classes.rightItem}>
                <Date />
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        mode: state.lesson.lessonMode,
        title: state.lesson.lessonData.title,
    }
};

export default connect(mapStateToProps,null)(LessonHeader);