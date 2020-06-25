import React, { useEffect,useState } from 'react';
import firebase from "../../firebase";
import { Link } from 'react-router-dom';
import LessonCard from './LessonListCard';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        marginRight: '20px' 
    }
})

const LessonList = (props) => {
    const classes = useStyles();
    const [lessons, setLessons] = useState([]);

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

    return (
        <div className={classes.root}>
            <ul>
                {lessons.map((el) => {

                    // return <li key={el.lessonId}><Link to={`/course/${props.match.params.id}/lesson/${el.lessonId}`}>{el.title}</Link></li>
                    return (
                        <Link key={el.lessonId} to={`/course/${props.match.params.id}/lesson/${el.lessonId}`} style={{ textDecoration: 'none' }}>
                            <LessonCard title={el.title} date={el.lessonDate} exrcNum={el.json.child.length} />
                        </Link>
                    )
                })}    
            </ul>
        </div>

    );
}
 
export default LessonList;