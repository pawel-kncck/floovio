import firebase from './firebase';
import { makeId } from '../.Utilities/Utilities'; 

export const getUser = (userId) => {
    const userRef = firebase.firestore().collection("users").doc(userId);
    return userRef.get()
}