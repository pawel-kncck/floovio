import React, { useEffect,useState,useContext } from 'react';
import firebase from "../../firebase";
import UserContext from '../../Context/UserContext';
import { Link } from 'react-router-dom';

const LessonList = () => {
    const [lessons, setLessons] = useState([]);
    const authUser = useContext(UserContext);

    useEffect(() => {
        const db = firebase.firestore()
        return db.collection("lessons").onSnapshot((snapshot) => {
            const lessonsFromSnapshot = [];
            snapshot.forEach(doc => lessonsFromSnapshot.push(({...doc.data(), lessonId: doc.id})));
            setLessons(lessonsFromSnapshot);
        });
    },[])

    return (
        <div>
            <ul>
                {lessons.map((el) => {
                    return (el.users[authUser.uid]) ? <li key={el.lessonId}><Link to={`lesson/${el.lessonId}`}>{el.title}</Link></li> : null
                })}    
            </ul>
        </div>

    );
}
 
export default LessonList;