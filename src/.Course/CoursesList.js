import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from '../.Database/firebase';
import CourseCard from './CourseCard';
import { makeStyles, Divider, Button } from '@material-ui/core';
import NewCourseDialog from './CourseActions/NewCourseDialog';
import JoinDialog from './CourseActions/JoinCourseDialog';
import * as dbFunctions from '../.Database/BackendFunctions';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        padding: '30px',
        position: 'relative',
        height: '100%',
        width: '100%',
        textDecoration: 'none',
    },
    actionButton: {
        marginLeft: "30px",
        marginTop: "40px"
    }
})

const CoursesList = (props) => {
    const [coursesArray, setCoursesArray] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);
    const classes = useStyles();

    const user = firebase.auth().currentUser;

    useEffect(() => {
        
        const  unsubscribe = firebase.firestore().collection("courses").where('users', 'array-contains', user.uid)
            .onSnapshot((snapshot) => {
                let coursesFromSnapshot = [];
                snapshot.forEach(doc => {
                    coursesFromSnapshot.push(({...doc.data(), id: doc.id}));
                }); 
                setCoursesArray(coursesFromSnapshot);
        });
        return () => {
            unsubscribe();
        }
    },[firebase])

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleJoinDialogOpen = () => {
        setJoinDialogOpen(true);
    };

    const handleJoinDialogClose = () => {
        setJoinDialogOpen(false);
    };


    return (
        <>
        <div className={classes.root}>
            {coursesArray.map((course, index) => {
                return <CourseCard key={index} courseId={course.id} name={course.name} students={course.roles.students} editors={course.roles.editors} teachers={course.roles.teachers} usersData={course.usersData} currentUser={user} />
            })}
        </div>
        <Divider />
        <Button className={classes.actionButton} variant="contained" color="primary" onClick={handleDialogOpen}>Create new course</Button>
        <Button className={classes.actionButton} variant="contained" color="primary" onClick={handleJoinDialogOpen}>Join a course</Button>
        <NewCourseDialog open={dialogOpen} close={handleDialogClose} userId={props.userId} />
        <JoinDialog open={joinDialogOpen} onClose={handleJoinDialogClose} />
        </>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userUid,
    }
}

export default connect(mapStateToProps)(CoursesList);