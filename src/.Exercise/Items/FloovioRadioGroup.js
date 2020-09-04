import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, makeStyles } from '@material-ui/core';
// import { getDeepValue } from '../.Utilities/helpers';
import { connect } from 'react-redux';
// import { setAnswerInState } from '../.Store/lesson.actions';
// import TeacherBox from './TeacherBox';

const useStyles = makeStyles({
    root: {
        position: 'relative',
    }
})

const FloovioRadioGroup = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState();

    // const userInputKeys = ["lessonData","userInput",props.activeStudent,props.id,"answer"];
    // const answer = (getDeepValue(props.currentLessonState,userInputKeys) || "");
    // const scoreInputKeys = ["lessonData","userInput",props.activeStudent,props.id,"score"];
    // const score = getDeepValue(props.currentLessonState,scoreInputKeys);

    const bgColor = () => {
        switch (score) {
            case -1: return 'rgba(250, 0, 0, 0.1)'
            case 1: return 'rgba(0, 250, 0, 0.1)'
            case 0: return 'rgba(250, 250, 250, 0.1)'
            default: return 'rgba(250, 250, 250, 0.1)'
        }     
    }

    // const updateAnswerHandler = (e) => {
    //     props.setUserInput(userInputKeys,e.target.value)
    //     props.setUserInput(scoreInputKeys,0)
    // }

    const labelStyle = {
        // background: bgColor(),
    }
    
    return (
        <div className={classes.root}>
            <RadioGroup 
                name={props.id}
                // disabled={props.userId !== props.activeStudent} 
                value={value}
                onChange={(e) => setValue(e)}
                // value={answer}
                // onChange={(e) => updateAnswerHandler(e)}
                >
                {props.options.map((el,index) => {
                    return <FormControlLabel style={labelStyle} key={'fcl' + index} value={el} control={<Radio />} label={el} />
                })}
            </RadioGroup>
            {/* {(props.mode === 'check') ? <TeacherBox id={props.id} /> : null} */}
        </div>
    );
}

// const mapStateToProps = state => {
//     return {
//         currentLessonState: state.lesson,
//         userId: state.auth.userUid,
//         activeStudent: state.course.activeStudent,
//         mode: state.lesson.lessonMode
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         setUserInput: (keys,value) => {dispatch(setAnswerInState(keys,value))}
//     }
// }
 
// export default connect(mapStateToProps,mapDispatchToProps)(PassiveRadioGroup);

export default FloovioRadioGroup;