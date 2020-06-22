import React, { Fragment } from 'react';
import { Typography, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import CoursesList from './CoursesList';

const CoursesLanding = (props) => {
    return (
        <Fragment>
            {props.authUser ? <CoursesList /> : <Typography variant="h1">You must be logged in to see all the courses</Typography> }
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        authUser: state.auth.authUser,
    }
}

export default connect(mapStateToProps)(CoursesLanding);