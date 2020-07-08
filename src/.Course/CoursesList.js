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
    linkText: {
        textDecoration: 'none',
        margin: '30px',

    }
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
                console.log(response);
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

    return (
        <div className={classes.root}>

            {coursesArray.map((el,index) => {
                return <Link to={`/course/${el.id}`} className={classes.linkText}><CourseCard key={index} title={el.title} students={el.students} teachers={el.teachers} /></Link>
            })}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authUser: state.auth.authUser,
        userId: state.auth.authUserId,
    }
}

export default connect(mapStateToProps)(CoursesList);