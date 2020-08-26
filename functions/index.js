const functions = require('firebase-functions');
const admin = require('firebase-admin');

// https://www.youtube.com/watch?v=m_u6P5k0vP0

var serviceAccount = require("./serviceAccountKey.json");

const firebaseConfig = {
    apiKey: "AIzaSyDc_JHhvxSz3a-EJDaGJqAi3GhMI4RPsfA",
    credential: admin.credential.cert(serviceAccount),
    authDomain: "dialetton.firebaseapp.com",
    databaseURL: "https://dialetton.firebaseio.com",
    projectId: "dialetton",
    storageBucket: "dialetton.appspot.com",
    messagingSenderId: "261646651559",
    appId: "1:261646651559:web:6c6cae4254fc897e1f0b82",
    measurementId: "G-1H6XQ9B3Z4"
};

admin.initializeApp(firebaseConfig);

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
            .then(user => {
                addCourse(name,language,level,user);
                return "Success: addCourse"
            })
            .catch(err => {
                return err;
            })
});

const addCourse = (courseName,language,level,userData) => {
    const clearUserData = removeCourseArraysFromUser(userData);

    return admin.firestore().collection('courses').add({
        title: courseName,
        language: language,
        level: level,
        author: clearUserData,
        teachers: [clearUserData],
        students: [],
        messages: [],
        notes: [],
        media: [],
        files: [],
    });
};

exports.populateUserData = functions.https.onCall(userId => {
    const coursesRef = db.collection("courses");
    // const userData = getUserData(userId);

    // return 'response from populate';
    
    // return coursesRef.where("users", "array-contains", userId)
    return coursesRef.where("users", "array-contains", userId)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                return doc.data();
            });
            return null;
        })
        .catch(err => {
            return err;
        })


    // coursesRef.where("language", "==", 'es')
    //     .get()
    //     .then(querySnapshot => {
    //         return querySnapshot;
    //     })
    //     .catch(error => {
    //         return error;
    //     });

        // .then(querySnapshot => {
        //     return querySnapshot;
        //     // querySnapshot.forEach(course => {
        //     //     course.update({
        //     //         usersData.[userId].displayName: userData.displayName,
        //     //     });
        //     // });
        // })
        // .catch(error => {
        //     return error;
        // })

    // courseRef.get()
    //     .then(doc => {
    //         if (doc.exists) {
    //             addCourseToStudent(data.studentId, data.courseId);
    //             addStudentToCourse(data.studentId, data.courseId);
    //             return "Success: joinCourse";
    //         } else {
    //             // doc.data() will be undefined in this case
    //             return "The invite code is invalid";
    //         }
    //     })
    //     .catch(error => {
    //         return "Error getting document:" + error;
    //     });
});

exports.sayHello = functions.https.onCall((data, context) => {
    return 'Hello, Pawel';
});

const removeCourseArraysFromUser = (userData) => {
    let trimmedUserData = userData;
    delete trimmedUserData.studyingCourses;
    delete trimmedUserData.teachingCourses;

    return trimmedUserData;
}

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

const getCourseData = courseId => {
    const courseRef = admin.firestore().collection('courses').doc(courseId);
    const userData = courseRef.get()
        .then(course => {
            return course.data();
        })
        .catch(err => {
            return err;
        })
    return userData;
}

exports.fetchCourseData = functions.https.onCall(courseId => {
    return getCourseData(courseId)
    .then(res => {
        return res
    })
    .catch(error => {
        return error
    })
})

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

// JOIN COURSE

exports.joinCourse = functions.https.onCall((data, context) => {
    // data: studentId, courseId
    var courseRef = db.collection("courses").doc(data.courseId);

    courseRef.get()
        .then(doc => {
            if (doc.exists) {
                addCourseToStudent(data.studentId, data.courseId);
                addStudentToCourse(data.studentId, data.courseId);
                return "Success: joinCourse";
            } else {
                // doc.data() will be undefined in this case
                return "The invite code is invalid";
            }
        })
        .catch(error => {
            return "Error getting document:" + error;
        });
});



const addCourseToStudent = (studentId, courseId) => {
        getUserData(studentId)
            .then(user => {
                let studyingCoursesArray = user.studyingCourses;
                studyingCoursesArray.push(courseId);
                admin.firestore().collection('users').doc(studentId).update({
                    studyingCourses: studyingCoursesArray,
                });
                return "Success: addCourseToStudent"
            })
            .catch(err => {
                return err;
            })
    }

const addStudentToCourse = (studentId, courseId) => {
        const courseRef = admin.firestore().collection('courses').doc(courseId)
        let listOfStudents;

        getCourseData(courseId)
            .then(course => {
                listOfStudents = course.students;
                return getUserData(studentId);
            })
            .then(student => {
                const newStudent = removeCourseArraysFromUser(student);
                listOfStudents.push(newStudent);

                courseRef.update({
                    students: listOfStudents,
                });
                
                return `Success: ${newStudent.displayName} was added as a student to the course`
            })
            .catch(err => {
                return err;
            })
    }