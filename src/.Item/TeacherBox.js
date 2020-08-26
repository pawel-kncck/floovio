import React, { useState } from 'react';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
// import { setScoreInState,setCommentInState } from '../../Store/oldActions';
import { setAnswerInState } from '../.Store/lesson.actions'
import { connect } from 'react-redux';
import { makeStyles, Button, IconButton } from '@material-ui/core';
import { green,red } from '@material-ui/core/colors';
import { getDeepValue } from '../.Utilities/helpers';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        right: 0,
        background: 'rgba(255,255,255,0.8)',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '3px',
    },
    comment: {
        display: 'inline',
    }
})

const TeacherBox = (props) => {
    const classes = useStyles();
    const [commentBoxVisible,setCommentBoxVisible] = useState();
    const scoreInputKeys = ["lessonData","userInput",props.activeStudent,props.id,"score"];
    const score = getDeepValue(props.currentLessonState,scoreInputKeys);
    const commentInputKeys = ["lessonData","userInput",props.activeStudent,props.id,"comment"];
    const comment = (getDeepValue(props.currentLessonState,commentInputKeys) || "");

    return (
        <div className={classes.root}>
            <ThumbUpIcon style={{ color: green[500], margin: '3px' }} fontSize='small' onClick={() => props.setUserInput(scoreInputKeys,score === 1 ? 0 : 1)} />
            <ThumbDownIcon style={{ color: red[500], margin: '3px' }} fontSize='small' onClick={() => props.setUserInput(scoreInputKeys,score === -1 ? 0 : -1)} />
            {/* <ChatOutlinedIcon onClick={() => setCommentBoxVisible(!commentBoxVisible)} /> */}
            {/* {(commentBoxVisible) ? <input type="text" value={comment} onChange={(e) => props.setUserInput(commentInputKeys, e.target.value)} /> : null} */}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentLessonState: state.lesson,
        userId: state.auth.userUid,
        activeStudent: state.course.activeStudent,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserInput: (keys,value) => {dispatch(setAnswerInState(keys,value))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TeacherBox);