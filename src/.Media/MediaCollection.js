import React, { useEffect, useState } from 'react';
import firebase from '../.Database/firebase';
import { makeStyles, List, Divider, Typography } from '@material-ui/core';
import MediaCard from './MediaCard';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '850px'
    },
    emptyContainer: {
        width: '750px',
        textAlign: 'center',
        margin: '50px 0'
    }
})

const MediaCollection = (props) => {
    const classes = useStyles();
    const [mediaList, setMediaList] = useState([]);

    useEffect(() => {
        const db = firebase.firestore()
        return db.collection("courses").doc(props.courseId).onSnapshot((snapshot) => {
            let mediaTempArray = [];
            snapshot.data().media.map(img => {
                mediaTempArray.push(img);
            })
            setMediaList(mediaTempArray);
        });
    },[props])

    return (
        <div className={classes.root}>
            {mediaList.length === 0 
                ?   (<div className={classes.emptyContainer}>
                        <img src='https://firebasestorage.googleapis.com/v0/b/dialetton.appspot.com/o/static%2Fsmall%20thinking%20face.png?alt=media&token=434a06c4-6f21-4ef5-9f56-8927e0ef23c8' alt='empty folder emoji' height='200px' />
                        <Typography variant='h5' color='textPrimary'>You don't have any files yet</Typography>
                    </div>)
                :   mediaList.map((file, index) => {
                        return (
                            <div key={index}>
                                <MediaCard url={file.data.url} name={file.data.name} code={file.data.id} mediaObject={file} courseId={props.courseId} />
                            </div>
                        )
            })}
        </div>
    );
}

export default MediaCollection;