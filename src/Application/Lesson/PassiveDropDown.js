import React from 'react';
import { makeStyles, Select, FormControl } from '@material-ui/core';
import { connect } from 'react-redux';
import { getDeepValue } from '../HyphenLesson/helpers';
import { setAnswerInState } from '../../Store/lesson.actions';
import TeacherBox from './TeacherBox';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles({
    root: {
        display: 'inline',
    },
    select: {
        width: '150px',
    }
})

const PassiveDropDown = (props) => {
    const classes = useStyles();
    const userInputKeys = ["lessonData","userInput",props.userId,props.id,"answer"];
    const answer = getDeepValue(props.currentLessonState,userInputKeys);
    const scoreInputKeys = ["lessonData","userInput",props.userId,props.id,"score"];
    const score = getDeepValue(props.currentLessonState,scoreInputKeys);

    const bgColor = (score) => {
        switch (score) {
            case -1: return 'rgba(250, 0, 0, 0.1)'
            case 1: return 'rgba(0, 250, 0, 0.1)'
            case 0: return 'rgba(250, 250, 250, 0.1)'
            default: return 'rgba(250, 250, 250, 0.1)'
        }     
    }

    const updateAnswerHandler = (e) => {
        props.setUserInput(userInputKeys,e.target.value)
        props.setUserInput(scoreInputKeys,0)
    }

    return (
        <FormControl className={classes.root}>
            <Select 
                native 
                id={props.id} 
                className={classes.select}
                style={{ backgroundColor: bgColor(score) }} 
                inputProps={{
                    name: `name${props.id}`,
                    id: props.id,
                }}
                value={answer}
                onChange={(e) => updateAnswerHandler(e)} >
                <option key='999' value=""></option>    
                {props.options.map((el,index) => {
                    return <option key={index} value={el}>{el}</option>
                })}
            </Select>
            {(props.mode === 'check') ? <TeacherBox id={props.id} /> : null}
        </FormControl>
    );
};

const mapStateToProps = state => {
    return {
        currentLessonState: state.lesson,
        userId: state.auth.authUser.uid,
        mode: state.lesson.lessonMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserInput: (keys,value) => {dispatch(setAnswerInState(keys,value))}
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(PassiveDropDown);