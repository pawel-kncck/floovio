const functions = require('firebase-functions');
const admin = require('firebase-admin');

// https://www.youtube.com/watch?v=m_u6P5k0vP0

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dialetton.firebaseio.com"
});

const firebaseConfig = {
    apiKey: "AIzaSyDc_JHhvxSz3a-EJDaGJqAi3GhMI4RPsfA",
    authDomain: "dialetton.firebaseapp.com",
    databaseURL: "https://dialetton.firebaseio.com",
    projectId: "dialetton",
    storageBucket: "dialetton.appspot.com",
    messagingSenderId: "261646651559",
    appId: "1:261646651559:web:6c6cae4254fc897e1f0b82",
    measurementId: "G-1H6XQ9B3Z4"
};

const db = admin.firestore()

exports.test = functions.https.onRequest((req, res) => {
    res.send('Sok marchewkowy');
})

exports.newUserSignup = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        uid: user.uid,
        displayName: '',
        profilePic: '',
        roles: ['student','teacher'],
        studyingCourses: [],
        teachingCourses: [],
        courses: [],
    });
});

exports.userDelete = functions.auth.user().onDelete(user => {
    const doc = admin.firestore().collection('users').doc(user.uid)
    return doc.delete();
});

// ADD COURSE

exports.addCourseWithUserId = functions.https.onCall((data, context) => {
    const name = data.courseName;
    const language = data.language;
    const level = data.level;
    const userId = data.userId;

    return getUserData(userId)
            .then(res => {
                addCourse(name,language,level,res);
                return "Success: addCourse"
            })
            .catch(err => {
                return err;
            })
});

const addCourse = (courseName,language,level,userData) => {
    let userDataWithoutCourseLists = userData;
    delete userDataWithoutCourseLists.studyingCourses;
    delete userDataWithoutCourseLists.teachingCourses;

    return admin.firestore().collection('courses').add({
        title: courseName,
        language: language,
        level: level,
        author: userData,
        teachers: [userData],
        students: [],
        notes: [],
    });
};

exports.sayHello = functions.https.onCall((data, context) => {
    return 'Hello, Pawel';
});

const getUserData = userId => {
    const userRef = admin.firestore().collection('users').doc(userId);
    const userData = userRef.get()
        .then(user => {
            return user.data();
        })
        .catch(err => {
            return err;
        })
    return userData;
}

exports.addTeachingCourseToUser = functions.firestore.document('/courses/{id}')
    .onCreate((snap, context) => {
        const courseId = context.params.id;
        const userId = snap.data().author.uid;

        return getUserData(userId)
            .then(resUserData => {
                let teachingCoursesArray = resUserData.teachingCourses;
                teachingCoursesArray.push(courseId);
                admin.firestore().collection('users').doc(userId).update({
                    teachingCourses: teachingCoursesArray,
                });
                return "Success: addTeachingCourseToUser"
            })
            .catch(err => {
                return err;
            })
    })

