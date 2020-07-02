import React from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

const SaveButton = (props) => {

    // const saveHandler = () => {
    //     if (props.mode === ('solve' || 'check')) {
    //         updateAnswers(courseIdFromPath,lessonIdFromPath,props.userInput)
    //     } else if (props.mode === 'edit') {
    //         updateLesson(courseIdFromPath,lessonIdFromPath,props.data)
    //     } else if (props.mode === 'new') {
    //         const db = firebase.firestore();
    //         db.collection("courses").doc(courseIdFromPath).collection('lessons').add({
    //             ...props.data,
    //             date: Date.now()
    //         })
    //             .then((response) => {
    //                 // console.log("Response: ", response)
    //                 history.push(`/course/${courseIdFromPath}/lesson/edit/${response.id}`)
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //         props.setMode('edit')

    //     }
    // }

    return (
        <Button 
            size="large" 
            variant="contained" 
            disabled={false} 
            color="primary" 
            className={classes.saveButton} 
            // onClick={saveHandler}
            >
            Save
        </Button>
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

export default connect(mapStateToProps,mapDispatchToProps)(SaveButton);