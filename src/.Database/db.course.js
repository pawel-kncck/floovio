import firebase from './firebase';

export const getCourse = (courseId) => {
    const courseRef = firebase.firestore().collection("courses").doc(courseId);
    return courseRef.get()
}

export const sendNote = (courseId, note, user) => {
    const noteRef = firebase.firestore().collection("courses").doc(courseId)
    const timestamp = new Date().getTime();

    noteRef.update({
        notes: firebase.firestore.FieldValue.arrayUnion({ body: note, user: user, epoch: timestamp })
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
}