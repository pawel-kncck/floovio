import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';


const CoursesList = (props) => {
    const [coursesArray, setCoursesArray] = useState([]);

    useEffect(() => {
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(props.userId);
        userRef.get()
            .then(res => {
                return res.data().studyingCourses;
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
        <Fragment>
            {coursesArray.map((el,index) => {
                return <Link to={`/course/${el.id}`}><li key={index}>{el.title}</li></Link>
            })}
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        authUser: state.auth.authUser,
        userId: state.auth.authUserId,
    }
}

export default connect(mapStateToProps)(CoursesList);