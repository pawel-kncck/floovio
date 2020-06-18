import React, { useState } from 'react';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { setScoreInState,setCommentInState } from '../../Store/oldActions';
import { connect } from 'react-redux';
import { makeStyles, Button, IconButton } from '@material-ui/core';
import { green,red } from '@material-ui/core/colors';


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
        <div className={classes.root}>
            <CheckBoxOutlinedIcon style={{ color: green[500] }} onClick={() => props.setScoreInState(props.id,1)} />
            <CancelOutlinedIcon style={{ color: red[500] }} onClick={() => props.setScoreInState(props.id,0)} />
            <ChatOutlinedIcon onClick={() => setCommentBoxVisible(!commentBoxVisible)} />
            {(commentBoxVisible) ? <input type="text" defaultValue={comment} onChange={(e) => props.setCommentInState(props.id, e.target.value)} /> : null}
        </div>
    );
}

const mapStateToProps = (state,ownProps) => {
    return {
        activeLessonData: state.oldReducer.activeLessonData,
        checking_mode: state.oldReducer.checking_mode,
        user: state.oldReducer.loggedUser,
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