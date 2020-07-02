import React from 'react';
import { connect } from 'react-redux';
import { setLessonAnswerInState } from '../../Store/oldActions';
import TeacherBox from '../../.Item/TeacherBox';
import { makeStyles, MenuItem, Select, FormControl } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'inline',
    },
    select: {
        width: '150px',
    }
})

const DropDown = (props) => {
    const classes = useStyles();
    let answer = "";
    if (props.activeLessonData.users) {
        if (props.activeLessonData.users[props.user]) {
            if (props.activeLessonData.users[props.user][props.id]) {
                if ((props.activeLessonData.users[props.user][props.id].answer))
                answer = props.activeLessonData.users[props.user][props.id].answer
            }
        }
    };

    // console.log(`Id: ${props.id}; answer: ${answer}`)

    return (

        <FormControl className={classes.root}>
            <Select id={props.id} className={classes.select} defaultValue={answer} onChange={(el) => props.setAnswerInState(props.id, el.target.value)}>
                {props.options.map((el,index) => {
                    return <MenuItem key={index} value={el}>{el}</MenuItem>
                })}
            </Select>
            {(props.checking_mode) ? <TeacherBox id={props.id} /> : null}
        </FormControl>
    );
};

const mapStateToProps = (state,ownProps) => {
    return{
        user: state.oldReducer.loggedUser,
        activeLessonData: state.oldReducer.activeLessonData,
        checking_mode: state.oldReducer.checking_mode,
        id: ownProps.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAnswerInState: (id,answer) => {dispatch(setLessonAnswerInState(id,answer))}, 
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(DropDown);