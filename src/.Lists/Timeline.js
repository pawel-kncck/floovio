import React, { useState } from 'react';
import firebase from '../.Database/firebase';
import List from './List/ListIndex';
import AddNewList from './AddNewList';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

const Timeline = (props) => {
    const courseIdFromPath = props.match.params.courseId || null;
    const currentUser = firebase.auth().currentUser;
    const allPropsLoaded = (Boolean(currentUser) && Boolean(courseIdFromPath))

    return (
        <>
            {(props.lists && Object.keys(props.lists).length !== 0)
                ?   Object.entries(props.lists).map(([key, listData]) => {
                        return <List key={key} listId={key} listData={listData} courseId={courseIdFromPath} user={currentUser} />
                    })
                :   <Typography variant='h4' color='textPrimary' style={{ margin: '30px', textAlign: 'center' }}>You don't have any lists yet.<br></br> Go ahead and create your first list!</Typography>
            }
            { allPropsLoaded ? <AddNewList courseId={courseIdFromPath} user={currentUser} /> : null }
        </>
    );
}

const mapStateToProps = state => {
    return {
        lists: state.course.data.lists,
    }
}

export default connect(mapStateToProps)(Timeline);