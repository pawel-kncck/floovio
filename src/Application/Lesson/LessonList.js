import React, { useEffect,useState } from 'react';
import firebase from "../../firebase";
import { Link } from 'react-router-dom';
import LessonCard from './LessonListCard';

const LessonList = (props) => {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const db = firebase.firestore()
        return db.collection("courses").doc(props.match.params.id).collection("lessons").onSnapshot((snapshot) => {
            const lessonsFromSnapshot = [];
            snapshot.forEach(doc => lessonsFromSnapshot.push(({...doc.data(), lessonId: doc.id})));
            setLessons(lessonsFromSnapshot);
            // console.log(lessonsFromSnapshot);
        });
    },[])

    return (
        <div>
            <ul>
                {lessons.map((el) => {

                    // return <li key={el.lessonId}><Link to={`/course/${props.match.params.id}/lesson/${el.lessonId}`}>{el.title}</Link></li>
                    return (
                        <Link key={el.lessonId} to={`/course/${props.match.params.id}/lesson/${el.lessonId}`}>
                            <LessonCard title={el.title} date={el.date} exrcNum={el.json.child.length} />
                        </Link>
                    )
                })}    
            </ul>
        </div>

    );
}
 
export default LessonList;