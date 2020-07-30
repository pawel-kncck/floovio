import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from '../.Database/firebase';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import { makeStyles, Divider, Button } from '@material-ui/core';
import NewCourseDialog from './CourseActions/NewCourseDialog';
import JoinDialog from './CourseActions/JoinCourseDialog';

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

    useEffect(() => {
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(props.userId);
        userRef.get()
            .then(res => {
                if (res.data().studyingCourses && res.data().teachingCourses) {
                    return [...res.data().studyingCourses, ...res.data().teachingCourses]
                } else if (res.data().studyingCourses && !res.data().teachingCourses) {
                    return [...res.data().studyingCourses]
                } else if (!res.data().studyingCourses && res.data().teachingCourses) {
                    return [...res.data().teachingCourses]
                } else {
                    return []
                }
            })
            .then(response => {
                let result = [];
                response.map((el) => {
                    const courseRef = db.collection('courses').doc(el);
                    courseRef.get()
                        .then((res) => {
                            result.push({...res.data(),id: el});
                            return [...result]
                        })
                        .then(res => {
                            setCoursesArray(res);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    return null
                })
            })
            .catch(err => {
                console.log(err);
            })
    }, [props])

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

            {coursesArray.map((el,index) => {
                return <CourseCard key={index} courseId={el.id} title={el.title} students={el.students} teachers={el.teachers} />
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