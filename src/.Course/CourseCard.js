import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '250px',
        height: '250px',
        border: '1px solid #ccc',
        textDecoration: 'none',
        color: '#333',
        borderRadius: '5px',
        boxShadow: '1px 2px 2px rgba(0, 0, 0, 0.5)',
        '&:hover': {
            backgroundColor: '#eee',
            boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)'
        }
    },
    titleContainer: {
        zIndex: 110,
        fontSize: '20px',
        padding: '15px',
        borderBottom: '1px solid #ddd',
    },
    teacherContainer: {
        zIndex: 110,
        margin: '10px',
        fontSize: '13px',
    },
    studentsContainer: {
        zIndex: 110,
        margin: '10px',
        fontSize: '13px',
    },
    label: {
        zIndex: 110,
        marginBottom: '5px',
        fontWeight: 500,
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
        zIndex: 110,
    },
    avatar: {
        zIndex: 110,
        marginRight: '10px',
    }
})

const CourseCard = (props) => {
    const classes = useStyles();
    console.log(props.students);

    return (
        <div className={classes.root}>
            <div className={classes.titleContainer}>
                {props.title}
            </div>
            <div className={classes.teacherContainer}>
                <div className={classes.label}>Teacher</div>
                <div className={classes.nameContainer}><Avatar className={classes.avatar} alt={props.teachers[0].displayName} src={props.teachers[0].profilePic} />{props.teachers[0].displayName}</div>
            </div>
            <div className={classes.studentsContainer}>
                <div className={classes.label}>Student</div>
                <div className={classes.nameContainer}><Avatar className={classes.avatar} alt={props.students[0].displayName} src={props.students[0].profilePic} />{props.students[0].displayName}</div>
            </div>
        </div>
    );
}
 
export default CourseCard;