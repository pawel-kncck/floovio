import React from 'react';
import { connect } from 'react-redux';
import { setLessonAnswerInState,createEmptyUsers,createEmptyUser,createEmptyElement } from '../../Store/oldActions';
import TeacherBox from './TeacherBox';

const TextField = (props) => {
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
        <div className="text-field-outer-div">
            <input className="text-field-input-box" type="text" defaultValue={answer} onChange={(el) => props.setAnswerInState(props.id,el.target.value)} />
            {(props.checking_mode) ? <TeacherBox id={props.id} /> : null}
        </div>
        
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
 
export default connect(mapStateToProps,mapDispatchToProps)(TextField);