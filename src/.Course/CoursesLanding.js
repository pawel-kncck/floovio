import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import CoursesList from './CoursesList';
import Login from '../.Authentication/LoginPage';

const CoursesLanding = (props) => {
    return (
        <Fragment>
            {props.authUser ? <CoursesList /> : <Login /> }
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        authUser: state.auth.authUser,
    }
}

export default connect(mapStateToProps)(CoursesLanding);