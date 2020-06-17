import React from 'react';
import firebase from '../../firebase';
import { wfhfBFTkQN0qYfBp8xu6,x1wOsivXmVn3ERhds4JN } from './lessons';

const LoadLessons = () => {
    const lessonsArray = [
        {
            id: 'x1wOsivXmVn3ERhds4JN',
            json: x1wOsivXmVn3ERhds4JN
        }
    ]

    function updateHandler() {
        const db = firebase.firestore();
        lessonsArray.map(el => {
            db.collection("lessons").doc(el.id).update({ 'json': el.json })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            })
        })
    }

    return (
        <div>
            <button onClick={updateHandler}>Load</button>
        </div>
    );
}
 
export default LoadLessons;



