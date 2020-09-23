import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import firebase from '../.Database/firebase';

const useStyles = makeStyles({
    root: {
        background: '#fff',
        boxSizing: 'border-box',
    }
})

const ImageElement = (props) => {
    const classes = useStyles();
    const [url, setUrl] = useState('');

    useEffect(() => {
        const mediaArray = props.media;

        if (mediaArray) {
            mediaArray.map(element => {
                if (element.data.id === props.code) {
                    setUrl(element.data.url);
                }
            });
        }
    },[props])


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

export default connect(mapStateToProps,null)(ImageElement);