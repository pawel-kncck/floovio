import React from 'react';
import { connect } from 'react-redux';
import { setLessonAnswerInState } from '../../Store/oldActions';
// import withAnswers from './withAnswers';
import TeacherBox from './TeacherBox';

const RadioGroup = (props) => {
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
        <div className="exrc-radio-group" key={`outerdiv${props.id}`}>
            {props.options.map((el,index) => {
                return (
                    <div key={`innerdiv${props.id + "_" + index}`}>
                        <input 
                            type="radio" 
                            id={props.id + "_" + index} 
                            key={props.id + "_" + index} 
                            value={el} 
                            name={props.id}
                            checked={answer[0] === index}
                            onChange={() => props.setAnswerInState(props.id,[index,el])}></input>
                        <label htmlFor={props.id + "_" + index} key={props.id + "_label_" + index}>{el}</label>
                    </div>

                )
            })}
            <TeacherBox id={props.id} />
        </div>
    );
}

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
 
export default connect(mapStateToProps,mapDispatchToProps)(RadioGroup);