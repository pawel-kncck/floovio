// Collections: courses, users, courses > lessons

course = {
    name: '',
    language: '',
    level: '',
    messages: [
        {
            body:'string', 
            author: 'string', 
            epoch: 'timestamp',
            uuid: 'string',
            parent: 'string',
        }
    ],
    notes: [
        {
            body: 'strings', 
            author: 'string', // name to change
            epoch: 'timestamp', 
            uuid: 'string',
            replies: [
                {
                    body:'string', 
                    author: 'string', 
                    epoch: 'timestamp',
                    uuid: 'string',
                }
            ],
        }
    ],
    media: [],
    files: [],
    users: [], // DUPLICATION - socundary, based od roles - useful for top level queries
    roles: { // PRIMARY SOURCE
        author: "",
        teachers: [],
        students: [],
        editors: [],
    },
    usersData : { // ADDITIONAL INFO (duplication of selected fields from USERS collection)
        uid: { // STORES INFO ABOUT DEACTIVATED USERS - cross checked with Notes, Messages and Files
            email: 'string', // DUPLICATE
            displayName: 'string', // DUPLICATE
            profilePic: 'string', // DUPLICATE
            role: { // DUPLICATION - socendary, based on high level roles{} - used for access rights
                is_student: true,
                is_teacher: true,
                is_editor: false,
                is_author: false,
            },
            status: "", // active, deactivated, blocked,
            plan: "", // free, standard, premium - duplication 
        }
    }
}

user = { // PRIMARY
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
    courses: [], // DUPLICATION - based on COURSES collection,
    coursesData: {
        uid: { // DUPLICATION - secondary, based on Courses collection
            name: '',
            language: '',
            level: '',
            roles: {
                teachers: [],
                students: [],
                editors: [],
            },
            usersData: {
                uid: {
                    email: '',
                    displayName: '',
                    profilePic: ''
                }
            },
        }
    },
    subscription: {
        plan: '', // free, standers, premium
        startDate: '',
        endDate: '',
    }
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