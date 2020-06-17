import React from 'react';
import { connect } from 'react-redux';
import { setLessonAnswerInState } from '../../Store/oldActions';
import TeacherBox from './TeacherBox';

const DropDown = (props) => {
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
        <div>
            <select id={props.id} onChange={(el) => props.setAnswerInState(props.id, el.target.value)}>
                <option key="99"></option>
                {props.options.map((el,index) => {
                    return <option key={index} value={el} selected={el === answer}>{el}</option>
                })}
            </select>
            <TeacherBox id={props.id} />
        </div>
    );
};

const mapStateToProps = (state,ownProps) => {
    return{
        user: state.loggedUser,
        activeLessonData: state.activeLessonData,
        id: ownProps.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAnswerInState: (id,answer) => {dispatch(setLessonAnswerInState(id,answer))}, 
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(DropDown);