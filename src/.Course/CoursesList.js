import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from '../.Database/firebase';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        padding: '30px',
        position: 'relative',
        height: '100%',
        width: '100%',
        textDecoration: 'none',
    },
})

const CoursesList = (props) => {
    const [coursesArray, setCoursesArray] = useState([]);
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
                            console.log(res);
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

    return (
        <div className={classes.root}>

            {coursesArray.map((el,index) => {
                return <CourseCard key={index} courseId={el.id} title={el.title} students={el.students} teachers={el.teachers} />
            })}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userUid,
    }
}

export default connect(mapStateToProps)(CoursesList);