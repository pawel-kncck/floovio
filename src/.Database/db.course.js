import firebase from './firebase';
import { v4 as uuid } from 'uuid';

export const getCourse = (courseId) => {
    const courseRef = firebase.firestore().collection("courses").doc(courseId);
    return courseRef.get()
}

export const sendNote = (courseId, note, user) => {
    const noteRef = firebase.firestore().collection("courses").doc(courseId)
    const timestamp = new Date().getTime();
    const newUuid = uuid();

    noteRef.update({
        notes: firebase.firestore.FieldValue.arrayUnion({ body: note, user: user, epoch: timestamp, uuid: newUuid })
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
}

export const removeNote = (courseId, note) => {
    const noteRef = firebase.firestore().collection("courses").doc(courseId)

    noteRef.update({
        notes: firebase.firestore.FieldValue.arrayRemove(note)
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
}