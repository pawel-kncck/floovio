import firebase from './firebase';

const db = firebase.firestore();

const getCourseRef = (courseId) => {
    return db.collection("courses").doc(courseId)
}

const getUserRef = (userId) => {
    return db.collection("users").doc(userId)
}

// DUPLICATION

// export let testPromise = new Promise((resolve, reject) => {
//     // after 1 second signal that the job is finished with an error
//     let results = [];
//     db.collection("users").get()
//         .then(querySnapshot => {
//             querySnapshot.forEach(function(doc) {
//                 results.push(doc.id);
//             });
//         })
//         .then(() => {
//             return resolve(results);
//         })
//         .catch(error => {
//             return reject(error);
//         })
//   });

export const getAllUsers = () => {
    let results = [];
    return db.collection("users").get()
        .then(querySnapshot => {
            querySnapshot.forEach(function(doc) {
                results.push(doc.id);
            });
        })
        .then(() => {
            return results;
        })
        .catch(error => {
            throw error;
        })
}


export const getUserDataById = (userId) => {
    return getUserRef(userId)
        .get()
        .then(response => {
            return response.data();
        })
        .catch(error => {
            throw error;
        })
}

const simplifyFullUserObject = (fullUserObject) => {
    return {
        email: fullUserObject.email,
        displayName: fullUserObject.displayName,
        profilePic: fullUserObject.profilePic
    }
}

export const getBasicUserDataById = (userId) => {
    return getUserRef(userId)
        .get()
        .then(response => {
            const fullUserData = response.data();
            const basicUserData = simplifyFullUserObject(fullUserData);
            return basicUserData;
        })
        .catch(error => {
            throw error;
        })
}

export const getUserDataByEmail = (email) => {
    // function
}

// USER DATA UPDATE 

export const updatePrimaryUserData = (userId, updatedObject) => { // displayName, profilePic
    const displayName = updatedObject.displayName;
    const profilePic = updatedObject.profilePic;

    getUserRef(userId)
        .update({ displayName: displayName, profilePic: profilePic})
        .then(response => {
            console.log(response.data());
        })
        .catch(error => {
            console.error(error);
        })
}

export const updateSecondaryUserDataInCourses = (userId) => {
    const fullUserDataObject = getUserDataById(userId);
    const coursesFromUser = fullUserDataObject.courses;

    coursesFromUser.map(courseId => {
        let courseRef = getCourseRef(courseId);
        courseRef.update({
            [`usersData.${userId}`]: simplifyFullUserObject(fullUserDataObject)
        })
    })
}

export const updateCourseDataForAllUsers = (courseId) => {
    // runs after course data is updated with user data
    // creates basicCourseData{} object
    // takes users[] array and iterates over it
    // inserts updated information in all users
}

export const duplicateUserDataInCourse = (userId, courseId) => {
    // function takes user data from collection('users').doc(userId)
    // creates an object with basic data (email, profilePic, displayName)
    // inserts data into collection('courses').doc(courseId).users[] & usersData{}
}

export const addUserToUsersArrayIfNotExists = (userId, courseId) => {
    // function takes one user, checks it exists in the users[] array, adds is doesn't exist
}

export const addUserToUserDataInCourse = (userId, courseId) => {
    // function takes userId, gets data from collection(users) and inserts to course.userData
}

export const updateUserArrayFromRolesSanitize = (courseId) => {
    // function marges role arrays: roles: { teachers: [], students: [], editors: [] }
}

export const updateUserDataFromRolesSanitize = (courseId) => {
    // function 
}

// COURSES

export const getAllCourses = () => {
    let results = [];
    db.collection("courses").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // console.log(doc.id, " => ", doc.data());
            results.push(doc.id);
        });
    });
    return results;
}

export const getCourseDataById = (courseId) => {
    return getCourseRef(courseId)
        .get()
        .then(response => {
            return (response.data());
        })
        .catch(error => {
            return (error);
        })
}

const simplifyFullCourseObject = (fullCourseObject) => {
    return {
        name: fullCourseObject.name,
        language: fullCourseObject.language,
        level: fullCourseObject.level,
        roles: fullCourseObject.roles,
        usersData: fullCourseObject.usersData,
    }
}

export const getBasicCourseData = (courseId) => {
    return getUserRef(courseId)
        .get()
        .then(response => {
            const fullCourseData = response.data();
            const basicCourseData = simplifyFullCourseObject(fullCourseData);
            return basicCourseData;
        })
        .catch(error => {
            return error;
        })
}

const addUserToUsersIfNotExists = (userId, courseId) => {
    const courseRef = getCourseRef(courseId);
    const fullCourseData = getCourseDataById(courseId);
    let usersArray = fullCourseData.courses;

    if (!usersArray.includes(userId)) {
        usersArray.push(userId);
        courseRef.update({
            users: usersArray,
        })
        .then(() => {
            console.log("Successful")
        })
        .catch(error => {
            console.error(error)
        })
    }
}

export const addCourseToUser = (userId, courseId) => {
    // func
}

export const addCourseDataToUser = (userId, courseId) => {
    // func
}



export const addUserRoleInCourse = (courseId, userId, role) => { // roles: teacher, student, editor, owner
    // func
}

export const removeUserRoleInCourse = (courseId, userId, role) => { // roles: teacher, student, editor, owner
    // func
}

// MULTI-STEP FUNCTIONS

const doesUsersArrayIncludeUser = (userId, fullCourseData) => {
    const usersArray = fullCourseData.users;
    return usersArray.includes(userId)
}

const doesRolesStudentsArrayIncludeUser = (userId, fullCourseData) => {
    const rolesStudentsArray = fullCourseData.roles.students;
    return rolesStudentsArray.includes(userId)
}

const doesUsersDataObjectIncludeUser = (userId, fullCourseData) => {
    const usersDataObject = fullCourseData.usersData;
    return usersDataObject.hasOwnProperty(userId);
}

// DATABASE CHANGES

export const addNewPropertyToAllDocuments = () => {
    db.collection("courses").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                db.collection("courses").doc(doc.id).update({
                    name: doc.data().title,
                })
            });
        })
        .catch(error => {
            throw error;
        })
}


export const removePropertyFromAllDocuments = () => {
    db.collection("courses").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                db.collection("courses").doc(doc.id).update({
                    "author.roles": firebase.firestore.FieldValue.delete(),
                })
            });
        })
        .catch(error => {
            throw error;
        })
}

export const addUserToCourse = (userId, courseId, role) => {
    const courseRef = getCourseRef(courseId);
    const userRef = getUserRef(userId);
    let userEmail;
    let courseName;
    let article = (role === 'editor') ? 'an' : 'a';

    return getBasicUserDataById(userId)
        .then(basicUserData => {
            const roleArray = findRoleArray(role);
            courseRef.update({
                [`roles.${roleArray}`]: firebase.firestore.FieldValue.arrayUnion(userId),
                users: firebase.firestore.FieldValue.arrayUnion(userId),
                [`usersData.${userId}`]: basicUserData,
            });
            userRef.update({
                courses: firebase.firestore.FieldValue.arrayUnion(courseId),
            });
            userEmail = basicUserData.email;
        })
        .then(() => {
            return `User ${userEmail} successfully added to course "${courseName}" as ${article} ${role}.`
        })
        .catch(err => {
            return err;
        })
}

export const unlockTeacher = (userUid) => {
    const userRef = getUserRef(userUid);

    return userRef.update({
            ['globalRoles.teacher']: true
        })
        .then(response => response)
        .catch(error => { throw error })
}

export const isTeacherCodeValid = (code) => {
    const codes = ['xf6ty87i','a47d5yhf','n68gd64f'];
    if (codes.includes(code)) {
        return true
    } else {
        return false
    }
}

const findRoleArray = (role) => {
    if (role === 'teacher') {
        return 'teachers'
    } else if (role === 'editor') {
        return 'editors'
    } else {
        return 'students'
    }
}

export const updateUserData = (userId, updatedObject) => {
    const userRef = getUserRef(userId);

    getUserDataById(userId)
        .then(fullUserObject => {
            userRef.update(updatedObject);
            return {
                ...fullUserObject,
                displayName: updatedObject.displayName,
                profilePic: updatedObject.profilePic
            }
        })
        .then(updatedFullUserObject => {
            updatedFullUserObject.courses.map(id => {
                getCourseRef(id).update({
                    [`usersData.${userId}`]: simplifyFullUserObject(updatedFullUserObject),
                })
            })
        })
}

export const getUsersWithCourse = (courseId) => {
    let results = [];
    return db.collection("users").where('courses', 'array-contains', courseId).get()
        .then(querySnapshot => {
            querySnapshot.forEach(function(doc) {
                results.push(simplifyFullUserObject(doc.data()));
            });
        })
        .then(() => {
            return results;
        })
        .catch(error => {
            throw error;
        })
}

export const getCoursesWithUser = (userId) => {
    let results = [];
    return db.collection("courses").where('users', 'array-contains', userId)
        .onSnapshot(querySnapshot => {
            querySnapshot.forEach(function(doc) {
                results.push({...simplifyFullCourseObject(doc.data()), id: doc.id});
            })
        })
}