import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { getDeepValue } from '../../.Utilities/helpers';
import { connect } from 'react-redux';
import { setAnswerInState } from '../../.Store/floovio.actions';
// import TeacherBox from './TeacherBox';

const useStyles = makeStyles({
    root: {
        position: 'relative',
    },
    textarea: {
        width: '100%',
        fontFamily: 'inherit',
        fontSize: '14px',
        minWidth: '500px',
    }
})

const FloovioTextArea = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState();

    // const userInputKeys = ["lessonData","userInput",props.activeStudent,props.id,"answer"];
    const userInputKeys = ["userInput",props.id,"answer"];
    const answer = (getDeepValue(props.currentExerciseState,userInputKeys) || "");
    // const scoreInputKeys = ["lessonData","userInput",props.activeStudent,props.id,"score"];
    // const score = getDeepValue(props.currentLessonState,scoreInputKeys);

    const updateAnswerHandler = (e) => {
        props.setUserInput(userInputKeys,e.target.value)
        // props.setUserInput(scoreInputKeys,0)
    }

    const bgColor = (score) => {
        switch (score) {
            case -1: return 'rgba(250, 0, 0, 0.1)'
            case 1: return 'rgba(0, 250, 0, 0.1)'
            case 0: return 'rgba(250, 250, 250, 0.1)'
            default: return 'rgba(250, 250, 250, 0.1)'
        }     
    }
    
    return (
        <div className={classes.root}>
            <textarea
                type='text' 
                // disabled={props.userId !== props.activeStudent} 
                rows={4}
                className={classes.textarea} 
                id={props.id}
                // style={{ backgroundColor: bgColor(score) }}
                // value={value}
                // onChange={(e) => setValue(e)}
                value={answer}
                onChange={(e) => updateAnswerHandler(e)} 
            ></textarea>
            {/* {(props.mode === 'check') ? <TeacherBox id={props.id} /> : null} */}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentExerciseState: state.floovio,
        userId: state.auth.userUid,
        activeStudent: state.course.activeStudent,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserInput: (keys, value) => {dispatch(setAnswerInState(keys, value))}
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(FloovioTextArea);