import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAnswerInState } from '../../Store/oldActions';

const Input = (props) => {
    const [value,setValue] = useState(props.answer)

    function handleChange(e) {
        setValue(e.target.value);
        props.setAnswerInState(props.id,e.target.value);
    }

    return (
        <input className="qwerty" type="text" id={props.id} value={value} onChange={handleChange} />
    );
}

const mapStateToProps = (state,ownProps) => {
    return {
        answer: state.activeExercise.answers[ownProps.id],
        id: ownProps.id
    }
}
const mapDispatchToProps = dispatch => {
    return {
      setAnswerInState: (id,answer) => {dispatch(setAnswerInState(id,answer))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Input);