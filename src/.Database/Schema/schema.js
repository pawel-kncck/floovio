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
    lists: {},
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

timeline = {
    lists: [
        {
            id: '3r5y7u8i',
            name: 'Lesson 1',
        },
        {
            id: '35fy56ty',
            name: 'Lesson 2',
            status: 'completed' // 'in progress'
        }
    ],
    items: [
        {
            listId: '', // if null or invalid - goes to unassigned
            type: 'file', // exercise - goes to editor or solver, link - takes you to the link, image - display full screen, pdf - display full sceen,
            url: '', // if exercise - use exercise id,
            name: '',
            description: '',
            createdAt: '',
            createdBy: '',
            updatedAt: '',
            status: '' // only applies to exercises // not part of the MVP
        }
    ]
}

course = {
    ...course,
    lists: [
        {
            id: 'f3tw5y7u',
            name: 'Lesson 1',
            status: 'completed',
            items: [
                {
                    id: 'g8R6t73d',
                    name: 'Bathroom',
                    type: 'image',
                    format: 'png',
                    url: 'https://firebasestorage.googleapis.com/v0/b/dialetton.appspot.com/o/files%2Flesson01_hero.png?alt=media&token=aeb358aa-2c45-4a45-ab7e-554bbd810698',
                    status: 'Todo'
                },
                {
                    id: 'k57gd9sa',
                    name: 'Spanish with Juan',
                    type: 'link',
                    format: '',
                    source: 'youtube',
                    url: 'https://www.youtube.com/watch?v=8Xfo1b4Pt9I',
                    status: 'Completed'
                }
            ]
        }
    ],
    systemLists: {
        bin: [
            {
                id: 'g8R6t73d',
                name: 'CV',
                type: 'document',
                format: 'pdf',
                url: 'https://firebasestorage.googleapis.com/v0/b/dialetton.appspot.com/o/files%2FPawel%20Kuncicki%20-%20CV.pdf?alt=media&token=f2a3da95-7669-4ab8-8eaf-2bec8affe716',
                status: '',
                lastListId: 'f3tw5y7u',
                deletedAt: ''
            },
        ],
        unassigned: [
            {
                id: 'g8R6t73d',
                name: 'Welcome letter',
                type: 'document',
                format: 'pdf',
                url: 'https://firebasestorage.googleapis.com/v0/b/dialetton.appspot.com/o/files%2FWelkomstbericht.pdf?alt=media&token=a07f6559-63a9-40d6-9560-10131b0fcafb',
                status: ''
            },
            {
                id: 'k57gd9sa',
                name: 'Direct and indirect objects',
                type: 'link',
                format: '',
                source: 'youtube',
                url: 'https://www.youtube.com/watch?v=vJD6AeHZ0j4',
                status: ''
            }
        ]
    }
}