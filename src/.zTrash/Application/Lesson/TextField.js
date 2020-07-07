import React from 'react';
import { connect } from 'react-redux';
import { setLessonAnswerInState } from '../../Store/oldActions';
import TeacherBox from './TeacherBox';
import { makeStyles } from '@material-ui/core';
import { TextField as MUITextField }  from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'inline'
    }
})

const TextField = (props) => {
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
    
    return (
        <div className={classes.root}>
            <MUITextField id={props.id} defaultValue={answer} value={answer} onChange={(el) => props.setAnswerInState(props.id,el.target.value)} />
            {(props.checking_mode) ? <TeacherBox id={props.id} /> : null}
        </div>
    );
}

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
 
export default connect(mapStateToProps,mapDispatchToProps)(TextField);