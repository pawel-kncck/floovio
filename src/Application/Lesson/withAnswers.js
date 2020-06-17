import React from 'react';
// import { connect } from 'react-redux';
import { setLessonAnswerInState } from '../../Store/actions';
import { connect } from 'react-redux';

const withAnswers = WrappedComponent => props => {
    let answer = "";
    if (props.activeLessonData.users) {
        if (props.activeLessonData.users[props.user]) {
            if (props.activeLessonData.users[props.user][props.id]) {
                if (props.activeLessonData.users[props.user][props.id].answer)
                    answer = props.activeLessonData.users[props.user][props.id].answer
            }
        }
    };
    
    return (
        <WrappedComponent answer={answer} {...props} />
    );
}

const mapStateToProps = (state,ownProps) => {
    return{
        user: state.loggedUser,
        activeLessonData: state.activeLessonData,
        checking_mode: state.checking_mode,
        id: ownProps.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAnswerInState: (id,answer) => {dispatch(setLessonAnswerInState(id,answer))}, 
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withAnswers);