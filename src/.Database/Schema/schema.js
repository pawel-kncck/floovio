// Collections: courses, users, courses > lessons

course = {
    title: courseName,
    language: language,
    level: level,
    author: clearUserData,
    teachers: [clearUserData], // to be deprecated
    students: [], // to be deprecated
    messages: [
        {
            body:'string', 
            userUid: 'string', 
            epoch: 'timestamp' }
    ],
    notes: [
        {
            body: 'strings', 
            userUid: 'string', // name to change
            epoch: 'timestamp', 
            uuid: 'string'
        }
    ],
    media: [],
    files: [],
    users: [
        {
            uid: 'string',
            email: 'string', // DUPLICATE
            displayName: 'string', // DUPLICATE
            profilePic: 'string', // DUPLICATE
            rolesInThisCourse: {
                teacher: true,
                editor: true,
                student: true
            }
        }
    ]
}

user = {
    email: 'string',
    uid: 'string', // to be depracated
    displayName: 'string',
    profilePic: 'string',
    rolesGlobal: {
        teacher: true,
        admin: false,
    },
    studyingCourses: [], // to be depracated
    teachingCourses: [], // to be deprecated
    courses: [],
}

lessonData = {
    title: "",
    author: "",
    lessonDate: new Date().getTime(),
    userInput: {},
    segments: [],
    json: { // do be deprecated
        node: 'element',
        tag: 'div',
        child: []
    },
    htmlStrings: [] //to be deprecaed
}