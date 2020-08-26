import React, { useEffect, useState } from 'react';
import firebase from "../../.Database/firebase";
import { useHistory } from 'react-router-dom';
import LessonCard from './LessonListCard';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
        margin: 0,
        padding: 0,
    },
    listContainer: {
        margin: 0,
        padding: 0,
    },
    buttomContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    }
})

const LessonList = (props) => {
    const classes = useStyles();
    const [lessons, setLessons] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const db = firebase.firestore()
        const unsubscribe = db.collection("courses").doc(props.courseId).collection("lessons")
            .onSnapshot((snapshot) => {
                let lessonsFromSnapshot = [];
                snapshot.forEach(doc => lessonsFromSnapshot.push(({...doc.data(), lessonId: doc.id})));
                lessonsFromSnapshot.sort((a,b) => b.lessonDate - a.lessonDate)
                setLessons(lessonsFromSnapshot);
                // console.log(lessonsFromSnapshot);
            });
        return () => {
            unsubscribe();
        }

    },[props])

    const handleNewLesson = () => {
        history.push(`/course/${props.courseId}/lesson/new`);
    }

    return (
        <div className={classes.root}>
            <ul className={classes.listContainer}>
                {lessons.map((el,index) => {
                    return (
                        <LessonCard 
                            key={el.lessonId}
                            lesNum={lessons.length - index} 
                            title={el.title} 
                            date={el.lessonDate} 
                            courseId={props.courseId}
                            lessonId={el.lessonId}
                        />
                    )
                })}    
            </ul>
            <div className={classes.buttomContainer}>
                <Button variant='contained' color='primary' onClick={handleNewLesson}>+ New lesson</Button>
            </div>
        </div>

    );
}

export default LessonList;