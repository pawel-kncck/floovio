import React from 'react';
import { makeStyles, Select, FormControl } from '@material-ui/core';
import { connect } from 'react-redux';
import { getDeepValue } from '../HyphenLesson/helpers';
import { setAnswerInState } from '../../Store/lesson.actions';

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
    const userInputKeys = ["userInput",props.userId,props.id,"answer"];
    const answer = getDeepValue(props.currentLessonState,userInputKeys);

    return (
        <FormControl className={classes.root}>
            <Select 
                native 
                id={props.id} 
                className={classes.select} 
                inputProps={{
                    name: `name${props.id}`,
                    id: props.id,
                }}
                value={answer}
                onChange={(e) => props.setUserInput(userInputKeys,e.target.value)} >
                <option key='999' value=""></option>    
                {props.options.map((el,index) => {
                    return <option key={index} value={el}>{el}</option>
                })}
            </Select>
        </FormControl>
    );
};

const mapStateToProps = state => {
    return {
        currentLessonState: state.lesson,
        userId: state.auth.authUser.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserInput: (keys,value) => {dispatch(setAnswerInState(keys,value))}
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(PassiveDropDown);