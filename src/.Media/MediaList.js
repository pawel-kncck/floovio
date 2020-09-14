import React, { useEffect, useState } from 'react';
import firebase from '../.Database/firebase';
import { makeStyles, List, Divider } from '@material-ui/core';
import MediaListItem from './MediaListItem';

const useStyles = makeStyles({
    root: {
        margin: 0,
        padding: 0,
    },
})

const MediaSidebar = (props) => {
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
        <List className={classes.root}>
            {mediaList.map((file, index) => {
                return (
                    <div key={index}>
                        <MediaListItem url={file.data.url} name={file.data.name} code={file.data.id} />
                        <Divider/>
                    </div>
                )
            })}
        </List>
    );
}

export default MediaSidebar;