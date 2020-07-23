import firebase from './firebase';

export const getUser = (userId) => {
    const userRef = firebase.firestore().collection("users").doc(userId);
    return userRef.get()
}