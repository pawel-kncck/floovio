import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';
import 'firebase/analytics';


const config = {
    apiKey: "AIzaSyDc_JHhvxSz3a-EJDaGJqAi3GhMI4RPsfA",
    authDomain: "dialetton.firebaseapp.com",
    databaseURL: "https://dialetton.firebaseio.com",
    projectId: "dialetton",
    storageBucket: "dialetton.appspot.com",
    messagingSenderId: "261646651559",
    appId: "1:261646651559:web:6c6cae4254fc897e1f0b82",
    measurementId: "G-1H6XQ9B3Z4"
};
// Initialize Firebase
firebase.initializeApp(config);
const storage = firebase.storage()
firebase.analytics();

export  {
    storage, firebase as default
  }
