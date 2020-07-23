import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import CoursesList from './CoursesList';
import Login from '../.Authentication/LoginPage';

const CoursesLanding = (props) => {
    return (
        <Fragment>
            {props.user ? <CoursesList /> : <Login /> }
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        user: state.auth.userUid,
    }
}

export default connect(mapStateToProps)(CoursesLanding);