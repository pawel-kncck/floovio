import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { fetchLesson, setMode, killSpinner, resetLessonData } from '../.Store/lesson.actions';
import { mapPathToMode } from '../.Utilities/helpers';
import Header from './Header/LessonHeader';
import ModeSwitch from './ModeSwitch';
import Body from './Body/LessonBody';
import Dialog from './Dialog/SegmentDialog';


const Lesson = (props) => {
    const mode = mapPathToMode(props.match.path);
    const lessonIdFromPath = props.match.params.lessonId || null;
    const courseIdFromPath = props.match.params.courseId || null;


    useEffect(() => {
        if (mode !== 'new') {
            props.fetchLesson(mode,courseIdFromPath,lessonIdFromPath);
        } else {
            props.killSpinner();
            props.resetLessonData();
        }
        props.setMode(mode);
    }, [props.fetchLesson,mode,courseIdFromPath,lessonIdFromPath])

   
    return (
        <Fragment>
            {(props.isFetching) 
                ? <CircularProgress disableShrink />
                :   <>
                        <Header mode={mode} courseId={courseIdFromPath} lessonId={lessonIdFromPath} />
                        <Body /> 
                    </>
            }

            {(props.open) 
                ? <Dialog />
                :   null
            }

            {(props.mode === 'new' || props.mode === 'edit') 
                ? <ModeSwitch />
                :   null
            }
        </Fragment>
    );
}


const mapStateToProps = state => {
    return {
        mode: state.lesson.lessonMode,
        isFetching: state.lesson.isFetching,
        open: state.lesson.dialog.open,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLesson: (mode, lessonId, courseId) => {dispatch(fetchLesson(mode, lessonId, courseId))},
        setMode: (path) => {dispatch(setMode(path))},
        killSpinner: () => {dispatch(killSpinner())},
        resetLessonData: () => {dispatch(resetLessonData())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Lesson);