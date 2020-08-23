import React, { useState, useEffect } from 'react';
import { makeStyles, Avatar, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import InviteDialog from './CourseActions/InviteDialog';
import EditDialog from './CourseActions/EditCourseDialog';

const useStyles = makeStyles({
    root: {
        marginRight: "30px",
        display: 'flex',
        flexDirection: 'column',
        width: '250px',
        border: '1px solid #ccc',
        textDecoration: 'none',
        color: '#333',
        borderRadius: '5px',
        boxShadow: '1px 2px 2px rgba(0, 0, 0, 0.5)',
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
    },
    actionsContainer: {
        borderTop: '1px solid #ddd',
        padding: "5px 5px",
        display: "flex",
        justifyContent: "flex-end",
    },
    actionButton: {
        margin: "10px 5px",
    }
})

const CourseCard = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [inviteOpen, setInviteOpen] = useState(false);
    const [editCourseOpen, setEditCourseOpen] = useState(false);

    const teachers = props.teachers;
    const students = props.students;

    const handleOpenCourse = () => {
        history.push(`/course/${props.courseId}`)
    }

    const handleEditDialogOpen = () => {
        setEditCourseOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditCourseOpen(false);
    };

    return (
        <div className={classes.root}>
            <div className={classes.titleContainer}>
                {props.title}
            </div>
            {(teachers.length > 0)
                ?   <div className={classes.teacherContainer}>
                        <div className={classes.label}>Teacher</div>
                        <div className={classes.nameContainer}><Avatar className={classes.avatar} alt={props.teachers[0].displayName} src={props.teachers[0].profilePic} />{props.teachers[0].displayName}</div>
                    </div>
                :   null
            }
            {(students.length > 0)
                ?   <div className={classes.studentsContainer}>
                        <div className={classes.label}>Student</div>
                        <div className={classes.nameContainer}><Avatar className={classes.avatar} alt={props.students[0].displayName} src={props.students[0].profilePic} />{props.students[0].displayName}</div>
                    </div>
                : null
            }
            
            <div className={classes.actionsContainer}>
                <Button className={classes.actionButton} variant="outlined" color="primary" size="small" onClick={handleEditDialogOpen}>Edit</Button>
                <Button className={classes.actionButton} variant="outlined" color="primary" size="small" onClick={() => setInviteOpen(true)}>Invite</Button>
                <Button className={classes.actionButton} variant="contained" color="primary" size="small" onClick={handleOpenCourse}>Open</Button>
            </div>
            <InviteDialog open={inviteOpen} onClose={() => setInviteOpen(false)} courseId={props.courseId} />
            <EditDialog open={editCourseOpen} close={handleEditDialogClose} courseId={props.courseId} />
        </div>
    );
}
 
export default CourseCard;