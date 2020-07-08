import React from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import firebase from '../../.Database/firebase';
import { updateLesson, updateAnswers } from '../../.Database/db.lesson';
import { useHistory } from 'react-router-dom';
import { setMode } from '../../.Store/lesson.actions';

const SaveButton = (props) => {
    const history = useHistory();

    const saveHandler = () => {
        if (props.mode === ('solve' || 'check')) {
            updateAnswers(props.courseId,props.lessonId,props.userInput)
        } else if (props.mode === 'edit') {
            updateLesson(props.courseId,props.lessonId,props.data)
        } else if (props.mode === 'new') {
            const db = firebase.firestore();
            db.collection("courses").doc(props.courseId).collection('lessons').add({
                ...props.data,
                date: Date.now()
            })
                .then((response) => {
                    history.push(`/course/${props.courseId}/lesson/edit/${response.id}`)
                })
                .catch((err) => {
                    console.log(err)
                })
            props.setMode('edit')

        }
    }

    return (
        <Button 
            // size="small" 
            variant="contained" 
            disabled={false} 
            color="primary"
            onClick={saveHandler}
            >
            Save
        </Button>
    );
}

const mapStateToProps = state => {
    return {
        data: state.lesson.lessonData,
        userInput: state.lesson.lessonData.userInput,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setMode: (value) => {dispatch(setMode(value))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SaveButton);