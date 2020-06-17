import React, { useState } from 'react';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { setScoreInState,setCommentInState } from '../../Store/oldActions';
import { connect } from 'react-redux';

const TeacherBox = (props) => {
    const [commentBoxVisible,setCommentBoxVisible] = useState(false);

    let comment = "";
    if (props.activeLessonData.users) {
        if (props.activeLessonData.users[props.user]) {
            if (props.activeLessonData.users[props.user][props.id]) {
                if ((props.activeLessonData.users[props.user][props.id].comment))
                comment = props.activeLessonData.users[props.user][props.id].comment
            }
        }
    };

    return (
        <div>
            <button>
                <CheckBoxOutlinedIcon onClick={() => props.setScoreInState(props.id,1)} />
            </button>
            <button>
                <CancelOutlinedIcon onClick={() => props.setScoreInState(props.id,0)} />
            </button>
            <div>
                <button onClick={() => setCommentBoxVisible(!commentBoxVisible)}>
                    <ChatOutlinedIcon />
                </button>
                {(commentBoxVisible) ? <input type="text" defaultValue={comment} onChange={(e) => props.setCommentInState(props.id, e.target.value)} /> : null}
            </div>
        </div>
    );
}

const mapStateToProps = (state,ownProps) => {
    return {
        activeLessonData: state.activeLessonData,
        checking_mode: state.checking_mode,
        user: state.loggedUser,
        id: ownProps.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setScoreInState: (id,score) => {dispatch(setScoreInState(id,score))},
        setCommentInState: (id,comment) =>  {dispatch(setCommentInState(id,comment))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TeacherBox);