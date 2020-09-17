const functions = require('firebase-functions');
const admin = require('firebase-admin');

// https://www.youtube.com/watch?v=m_u6P5k0vP0

var serviceAccount = require("./dialetton-firebase-adminsdk-servaccountkey.json");

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    credential: admin.credential.cert(serviceAccount),
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore()

exports.test = functions.https.onRequest((req, res) => {
    res.send('Sok marchewkowy');
})

exports.newUserSignup = functions.auth.user().onCreate(user => {
    const createDate = new Date();

    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        uid: user.uid,
        createdAt: createDate,
        displayName: '',
        profilePic: '',
        globalRoles: {
            student: true,
            teacher: false,
            editor: false,
            admin: false,
        },
        courses: [],
        coursesData: {},
        subscription: {
            plan: 'premium',
            startDate: createDate,
            endDate: null,
        }
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
        name: courseName,
        language: language,
        level: level,
        author: clearUserData,
        users: [userData.uid],
        roles: {
            author: userData.uid,
            teachers: [userData.uid],
            editors: [userData.uid],
            students: []
        },
        usersData: {
            [`${userData.uid}`]: clearUserData
        },
        lists: {},
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