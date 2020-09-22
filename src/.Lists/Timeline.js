import React, { useState } from 'react';
import firebase from '../.Database/firebase';
import List from './List/ListIndex';
import AddNewList from './AddNewList';
import { connect } from 'react-redux';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
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

const Timeline = (props) => {
    const classes = useStyles();
    const courseIdFromPath = props.match.params.courseId || null;
    const currentUser = firebase.auth().currentUser;
    const allPropsLoaded = (Boolean(currentUser) && Boolean(courseIdFromPath))
    const canUserEdit = (props.courseData.roles) ? props.courseData.roles.teachers.includes(props.activeUser) || props.courseData.roles.editors.includes(props.activeUser) : false;

    return (
        <>
            {(props.lists && Object.keys(props.lists).length !== 0)
                ?   Object.entries(props.lists)
                        .sort((a, b) => {
                            return (a[1].name < b[1].name ? -1 : (a[1].name > b[1].name ? 1 : 0))
                        })
                        .map(([key, listData]) => {
                                return <List key={key} listId={key} listData={listData} courseId={courseIdFromPath} user={currentUser} canUserEdit={canUserEdit} />
                            })
                :   <div className={classes.noCoursesContainer}>   
                        <Typography variant='h4' color='textPrimary' align='center'>
                            You don't have any lessons yet
                        </Typography>
                        <img className={classes.image} src='https://firebasestorage.googleapis.com/v0/b/dialetton.appspot.com/o/static%2Fpngguru.com.png?alt=media&token=469e6100-3740-48d3-b475-976077db353d' alt='woman shrugging emoji' height='200px' />
                        <Typography variant='h5' color='textPrimary' align='center'>
                            Go ahead and create your first lesson!
                        </Typography> 
                    </div>
            }
            { (allPropsLoaded && canUserEdit) ? <AddNewList courseId={courseIdFromPath} user={currentUser} /> : null }
        </>
    );
}

const mapStateToProps = state => {
    return {
        lists: state.course.data.lists,
        courseData: state.course.data,
        activeUser: state.auth.userUid
    }
}

export default connect(mapStateToProps)(Timeline);