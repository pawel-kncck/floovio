import firebase from './firebase';

export const addMedia = (courseId, data, user) => {
    const mediaRef = firebase.firestore().collection("courses").doc(courseId)
    const timestamp = new Date().getTime();

    mediaRef.update({
        media: firebase.firestore.FieldValue.arrayUnion({ data: data, user: user, epoch: timestamp })
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
}