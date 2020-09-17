import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from '../.Database/firebase';
import CourseCard from './CourseCard';
import { makeStyles, Divider, Button, Typography, Backdrop, CircularProgress } from '@material-ui/core';
import NewCourseDialog from './CourseActions/NewCourseDialog';
import JoinDialog from './CourseActions/JoinCourseDialog';
import * as dbFunctions from '../.Database/BackendFunctions';
import { fetchUserData } from '../.Store/auth.actions';

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
        margin: "30px 30px",
    },
    noCoursesContainer: {
        maxWidth: '700px',
        margin: 'auto',
        textAlign: 'center'
    },
    image: {
        marginTop: '30px',
        marginBottom: '30px'
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

    // 2nd useEffect is needed for sign up process to manage delay between user creation and 
    // collection('users').doc(userId) creation by backend function

    useEffect(() => {
        const unsubscribeUser = firebase.firestore().collection("users").doc(user.uid)
            .onSnapshot(userDoc => {
                props.fetchUserData(user);
            });
        return () => {
            unsubscribeUser();
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

    if (props.userData) {
        return (
            <>
            <div className={classes.root}>
                {coursesArray.map((course, index) => {
                    return <CourseCard key={index} courseId={course.id} name={course.name} students={course.roles.students} editors={course.roles.editors} teachers={course.roles.teachers} usersData={course.usersData} currentUser={user} />
                })}
                {(coursesArray.length === 0)
                    ?   <div className={classes.noCoursesContainer}>   
                            <Typography variant='h4' color='textPrimary' align='center'>
                                {(props.isTeacher) ? `You don't have any courses yet.` : `You don't have any courses yet.` }
                            </Typography>
                            <img className={classes.image} src='https://firebasestorage.googleapis.com/v0/b/dialetton.appspot.com/o/static%2Fpngguru.com.png?alt=media&token=469e6100-3740-48d3-b475-976077db353d' alt='woman shrugging emoji' height='200px' />
                            <Typography variant='h5' color='textPrimary' align='center'>
                                {(props.isTeacher) ? `Click on the button below, to create a course` : `Click on the button below, to join a course with an invite code. You should get the invite code from your teacher.` }
                            </Typography> 
                        </div>
                    : null
                }
            </div>
            <Divider />
            {props.isTeacher ? <Button className={classes.actionButton} variant="contained" color="primary" onClick={handleDialogOpen}>Create new course</Button> : null}
            <Button className={classes.actionButton} variant="contained" color="primary" onClick={handleJoinDialogOpen}>Join a course</Button>
            <NewCourseDialog open={dialogOpen} close={handleDialogClose} userId={props.userId} />
            <JoinDialog open={joinDialogOpen} onClose={handleJoinDialogClose} />
            </>
        );
    } else {
        return (
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }


    
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userUid,
        userData: state.auth.userData,
        // isTeacher: state.auth.userData.globalRoles.teacher
    }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: (user) => dispatch(fetchUserData(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList);