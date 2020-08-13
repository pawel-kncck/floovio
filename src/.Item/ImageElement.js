import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import firebase from '../.Database/firebase';

const useStyles = makeStyles({
    root: {
        background: '#ddd',
        margin: '5px',
        width: 'auto',
        boxSizing: 'border-box',
    }
})

const ImageElement = (props) => {
    const classes = useStyles();
    const [url, setUrl] = useState();

    const storageRef = firebase.storage().ref();
    // var spaceRef = storageRef.child(`media/${props.media[props.code].name}`);
    // var path = spaceRef.fullPath;
    // var gsReference = storage.refFromURL('gs://test.appspot.com')

    if (props.media) {
        storageRef.child(`media/${props.courseId}/${props.media[props.code].name}`).getDownloadURL()
            .then(url => {
                setUrl(url);
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <div className={classes.root}>
            <img src={url} height={props.height} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        mode: state.lesson.lessonMode,
        userId: state.auth.userUid,
        media: state.course.data.media,
        courseId: state.course.data.uid
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         setUserInput: (keys,value) => {dispatch(setAnswerInState(keys,value))}
//     }
// }

export default connect(mapStateToProps,null)(ImageElement);