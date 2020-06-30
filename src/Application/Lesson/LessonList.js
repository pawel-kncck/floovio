import React, { useEffect, useState } from 'react';
import firebase from "../../firebase";
import { Link, useHistory } from 'react-router-dom';
import LessonCard from './LessonListCard';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '268px',
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
        return db.collection("courses").doc(props.match.params.id).collection("lessons").onSnapshot((snapshot) => {
            const lessonsFromSnapshot = [];
            snapshot.forEach(doc => lessonsFromSnapshot.push(({...doc.data(), lessonId: doc.id})));
            lessonsFromSnapshot.sort((a,b) => b.lessonDate - a.lessonDate)
            setLessons(lessonsFromSnapshot);
            // console.log(lessonsFromSnapshot);
        });
    },[props])

    const handleNewLesson = () => {
        history.push(`/course/${props.match.params.id}/lesson/new`);
    }

    return (
        <div className={classes.root}>
            <ul className={classes.listContainer}>
                {lessons.map((el,index) => {

                    // return <li key={el.lessonId}><Link to={`/course/${props.match.params.id}/lesson/${el.lessonId}`}>{el.title}</Link></li>
                    return (
                        <Link key={el.lessonId} to={`/course/${props.match.params.id}/lesson/${el.lessonId}`} style={{ textDecoration: 'none' }}>
                            <LessonCard lesNum={lessons.length - index} title={el.title} date={el.lessonDate} exrcNum={el.json.child.length} />
                        </Link>
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