import React from 'react';
import { Button } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// props = index, mode

const EditingPanel = (props) => {
    
    const handleOpenEditorInEditMode = (index) => {
        setOpen(true);
        setInitialEditorContent(props.data.htmlStrings[index].__html);
        setActiveExercise(index);
    }

    return (
        <div className={classes.editButtons}>
            <Button color="primary"><ArrowUpwardIcon /></Button>
            <Button color="primary"><ArrowDownwardIcon /></Button>
            <Button color="primary" onClick={() => handleOpenEditorInEditMode(index)}><EditIcon /></Button>
            <Button color="primary" onClick={() => props.deleteExercise(index)}><DeleteIcon /></Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        data: state.lesson.lessonData,
        mode: state.lesson.lessonMode,
        userInput: state.lesson.lessonData.userInput,
        isFetching: state.lesson.isFetching,
        title: state.lesson.lessonData.title,
        exercises: state.lesson.lessonData.json.child,
        htmlStrings: state.lesson.lessonData.htmlStrings,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLesson: (mode, lessonId, courseId) => {dispatch(fetchLesson(mode, lessonId, courseId))},
        setMode: (path) => {dispatch(setMode(path))},
        setTitle: (title) => {dispatch(setTitle(title))},
        setLessonDate: (epoch) => {dispatch(setLessonDate(epoch))},
        setAuthor: (author) => {dispatch(setAuthor(author))},
        addExercise: (json,html) => {dispatch(addExercise(json,html))},
        updateExercise: (json,html,index) => {dispatch(updateExercise(json,html,index))},
        deleteExercise: (index) => {dispatch(deleteExercise(index))},
        killSpinner: () => {dispatch(killSpinner())},
        addImage: (url) => {dispatch(addImage(url))},
        resetLessonData: () => {dispatch(resetLessonData())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditingPanel);