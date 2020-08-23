import React from 'react';
import { makeStyles } from '@material-ui/core';
import { getDeepValue } from '../.Utilities/helpers';
import { connect } from 'react-redux';
import { setAnswerInState } from '../.Store/lesson.actions'
import TeacherBox from './TeacherBox';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        display: 'inline',
    },
    input: {
        borderTop: 'none',
        borderRight: 'none',
        borderBottom: '1px solid #333',
        borderLeft: 'none',
        outline: 'none',
        position: 'relative',
        fontSize: '16px',
            '&:focus': {
                borderBottom: '2px solid #777'
            },
    }
})

const PassiveTextField = (props) => {
    const classes = useStyles();
    const userInputKeys = ["lessonData","userInput",props.userId,props.id,"answer"];
    const answer = (getDeepValue(props.currentLessonState,userInputKeys) || "");
    const scoreInputKeys = ["lessonData","userInput",props.userId,props.id,"score"];
    const score = getDeepValue(props.currentLessonState,scoreInputKeys);

    const updateAnswerHandler = (e) => {
        props.setUserInput(userInputKeys,e.target.value)
        props.setUserInput(scoreInputKeys,0)
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
            <input
                type='text' 
                className={classes.input} 
                id={props.id}
                style={{ backgroundColor: bgColor(score) }}
                value={answer}
                onChange={(e) => updateAnswerHandler(e)} 
            ></input>
            {(props.mode === 'check') ? <TeacherBox id={props.id} /> : null}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentLessonState: state.lesson,
        userId: state.auth.userUid,
        mode: state.lesson.lessonMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserInput: (keys,value) => {dispatch(setAnswerInState(keys,value))}
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(PassiveTextField);