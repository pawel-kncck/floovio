import firebase from './firebase';

export const getCourse = (courseId) => {
    const courseRef = firebase.firestore().collection("courses").doc(courseId);
    return courseRef.get()
}