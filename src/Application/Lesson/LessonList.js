import React, { useEffect,useState,useContext } from 'react';
import firebase from "../../firebase";
import UserContext from '../../Context/UserContext';
import { Link } from 'react-router-dom';

const LessonList = (props) => {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const db = firebase.firestore()
        return db.collection("courses").doc(props.match.params.id).collection("lessons").onSnapshot((snapshot) => {
            const lessonsFromSnapshot = [];
            snapshot.forEach(doc => lessonsFromSnapshot.push(({...doc.data(), lessonId: doc.id})));
            setLessons(lessonsFromSnapshot);
            console.log(lessonsFromSnapshot);
        });
    },[])

    return (
        <div>
            <ul>
                {lessons.map((el) => {
                    return <li key={el.lessonId}><Link to={`/course/${props.match.params.id}/lesson/${el.lessonId}`}>{el.title}</Link></li>
                })}    
            </ul>
        </div>

    );
}
 
export default LessonList;