import React, { useState } from 'react';
import { makeStyles, Select, FormControl } from '@material-ui/core';
import { connect } from 'react-redux';
import { getDeepValue } from '../../.Utilities/helpers';
import { setAnswerInState } from '../../.Store/floovio.actions';
// import TeacherBox from './TeacherBox';

const useStyles = makeStyles({
    root: {
        display: 'inline',
        position: 'relative',
    },
    select: {
        width: '150px',
    }
})

const FloovioDropDown = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState();

    // const userInputKeys = ["lessonData","userInput",props.activeStudent,props.id,"answer"];
    const userInputKeys = ["userInput",props.id,"answer"];
    const answer = (getDeepValue(props.currentExerciseState,userInputKeys) || "");
    // const scoreInputKeys = ["lessonData","userInput",props.activeStudent,props.id,"score"];
    // const score = getDeepValue(props.currentLessonState,scoreInputKeys);

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
        // props.setUserInput(scoreInputKeys,0)
    }

    return (
        <FormControl className={classes.root}>
            <Select 
                native 
                id={props.id} 
                // disabled={props.userId !== props.activeStudent} 
                className={classes.select}
                // style={{ backgroundColor: bgColor(score) }} 
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
            {/* {(props.mode === 'check') ? <TeacherBox id={props.id} /> : null} */}
        </FormControl>
    );
};

const mapStateToProps = state => {
    return {
        currentExerciseState: state.floovio,
        userId: state.auth.userUid,
        activeStudent: state.course.activeStudent,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserInput: (keys,value) => {dispatch(setAnswerInState(keys,value))}
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(FloovioDropDown);