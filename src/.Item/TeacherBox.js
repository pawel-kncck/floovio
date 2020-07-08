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


const useStyles = makeStyles({
    root: {
        display: 'inline',
    },
    comment: {
        display: 'inline',
    }
})

const TeacherBox = (props) => {
    const classes = useStyles();
    const [commentBoxVisible,setCommentBoxVisible] = useState();
    const scoreInputKeys = ["lessonData","userInput",props.userId,props.id,"score"];
    const score = getDeepValue(props.currentLessonState,scoreInputKeys);
    const commentInputKeys = ["lessonData","userInput",props.userId,props.id,"comment"];
    const comment = (getDeepValue(props.currentLessonState,commentInputKeys) || "");

    return (
        // <div className={classes.root}>
            <>
            <CheckBoxOutlinedIcon style={{ color: green[500] }} onClick={() => props.setUserInput(scoreInputKeys,score === 1 ? 0 : 1)} />
            <CancelOutlinedIcon style={{ color: red[500] }} onClick={() => props.setUserInput(scoreInputKeys,score === -1 ? 0 : -1)} />
            <ChatOutlinedIcon onClick={() => setCommentBoxVisible(!commentBoxVisible)} />
            {(commentBoxVisible) ? <input type="text" value={comment} onChange={(e) => props.setUserInput(commentInputKeys, e.target.value)} /> : null}
            </>
        // </div>
    );
}

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

export default connect(mapStateToProps,mapDispatchToProps)(TeacherBox);