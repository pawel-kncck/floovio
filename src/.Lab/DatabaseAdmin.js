import React, { useState } from 'react';
import { Button, makeStyles, Grid, Paper, TextField } from '@material-ui/core';
import firebase from '../.Database/firebase';
import * as dbFunctions from './BackendFunctions';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paperOutput: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '100vh',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: '10px',
        transform: 'none',
        padding: '10px',
        border: '1px solid #555',
        borderRadius: '5px',
        background: '#fff',
        '&:hover': {
            backgroundColor: '#ddd',
        },
        transition: 'background 0.2s',
    },
    textField: {
        display: 'block',
    },
    pre: {
        textAlign: 'left',
    }
}));

const BackendFunctions = () => {
    const classes = useStyles();
    const [userId, setUserId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [output, setOutput] = useState('test');
    const db = firebase.firestore();

    const handleOutput = (queryResult) => {
        return JSON.stringify(queryResult, null, "\t");
    }

    // const handleGetAllUsers = () => {
    //     let results = [];
    //     db.collection("users").get()
    //         .then(querySnapshot => {
    //             querySnapshot.forEach(function(doc) {
    //                 results.push(doc.id);
    //             });
    //         })
    //         .then(() => {
    //             setOutput(JSON.stringify(results, null, "\t"));
    //         })
    //         .catch(error => {
    //             setOutput(JSON.stringify(error, null, "\t"));
    //         })
    // }

    const handleGetAllUsers = () => {
        dbFunctions.getAllUsers().then(allUsers => 
        setOutput(JSON.stringify(allUsers, null, "\t")));
    }

    const handleGetUsersWithCourse = (courseId) => {
        dbFunctions.getUsersWithCourse(courseId).then(selectedUsers => 
        setOutput(JSON.stringify(selectedUsers, null, "\t")));
    }

    const handleGetCoursesWithUser = (userId) => {
        dbFunctions.getCoursesWithUser(userId).then(selectedCourses => 
        setOutput(JSON.stringify(selectedCourses, null, "\t")));
    }

    const handleGetAllCourses = () => {
        let results = [];
        db.collection("courses").get()
            .then(querySnapshot => {
                querySnapshot.forEach(function(doc) {
                    results.push(doc.id);
                });
            })
            .then(() => {
                setOutput(JSON.stringify(results, null, "\t"));
            })
            .catch(error => {
                setOutput(JSON.stringify(error, null, "\t"));
            })
    }

    const getUserDataById = (userUidInput) => {
        db.collection("users").doc(userUidInput)
            .get()
            .then(response => {
                setOutput(JSON.stringify(response.data(), null, "\t"));
            })
            .catch(error => {
                setOutput(JSON.stringify(error, null, "\t"));
            })
    }

    const getCourseDataById = (courseUidInput) => {
        db.collection("courses").doc(courseUidInput)
            .get()
            .then(response => {
                setOutput(JSON.stringify(response.data(), null, "\t"));
            })
            .catch(error => {
                setOutput(JSON.stringify(error, null, "\t"));
            })
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <button onClick={() => handleGetAllUsers()} className={classes.button}>getAllUsers</button>
                        <button onClick={() => handleGetAllCourses()} className={classes.button}>getAllCourses</button>
                    </Paper>
                    <Paper className={classes.paper}>
                        <TextField className={classes.textField} label="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} fullWidth></TextField>
                        <TextField className={classes.textField} label="Course ID" value={courseId} onChange={(e) => setCourseId(e.target.value)} fullWidth></TextField>
                    </Paper> 
                    <Paper className={classes.paper}>
                        <button disabled={userId === ''} onClick={() => getUserDataById(userId)} className={classes.button}>get User Data By Id</button>
                        <button disabled={courseId === ''} onClick={() => getCourseDataById(courseId)} className={classes.button}>get Course Data By Id</button>
                    </Paper>
                    <Paper className={classes.paper}>
                        <button onClick={() => dbFunctions.addNewPropertyToAllDocuments()} className={classes.button}>addNewPropertyToAllDocuments</button>
                        <button 
                            disabled={(userId === '' || courseId === '')} 
                            onClick={() => dbFunctions.addUserToCourse(userId, courseId, 'editor')} 
                            className={classes.button}
                            >addUserAsEditor
                        </button>
                        <button 
                            disabled={(userId === '' || courseId === '')} 
                            onClick={() => dbFunctions.addUserToCourse(userId, courseId, 'teacher')} 
                            className={classes.button}
                            >addUserAsTeacher
                        </button>
                        <button 
                            disabled={(userId === '' || courseId === '')} 
                            onClick={() => dbFunctions.addUserToCourse(userId, courseId, 'student')} 
                            className={classes.button}
                            >addUserAsStudent
                        </button>
                        <br>
                        </br>
                        <button 
                            disabled={courseId === ''} 
                            onClick={() => handleGetUsersWithCourse(courseId)} 
                            className={classes.button}
                            >getUsersWithCourse
                        </button>
                        <button 
                            disabled={userId === ''} 
                            onClick={() => handleGetCoursesWithUser(userId)} 
                            className={classes.button}
                            >getCoursesWithUser
                        </button>

                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paperOutput}>
                        <pre className={classes.pre}>{output}</pre>
                    </Paper>
                </Grid>
            </Grid>
        </div>
        
    );
}
 
export default BackendFunctions;