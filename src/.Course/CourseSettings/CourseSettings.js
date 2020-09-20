import React, { useState } from 'react';
import { Table, TableBody, Paper, TableContainer, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CourseNameRow from './CourseNameRow';
import CourseLanguageRow from './CourseLanguageRow';
import CourseLevelRow from './CourseLevelRow';
import CourseTeachersRow from './CourseTeachersRow';
import CourseStudentsRow from './CourseStudentsRow';
import StudentDeletePrompt from './StudentDeletePrompt';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    margin: '30px 0',
  },
  heading: {
    marginTop: '30px',
  }
});

const CourseSettings = (props) => {
  const classes = useStyles();
  const courseId = props.match.params.courseId;
  const [student, setStudent] = useState(null);
  const [deleteStudentOpen, setDeleteStudentOpen] = useState(false);
  const userIsTeacher = (props.courseData.roles) ? props.courseData.roles.teachers.includes(props.activeUser) : false;

  const handleStudentDeletePromptClose = () => {
    setDeleteStudentOpen(false);
    setStudent(null);
  }

  const handleStudentDeletePromptOpen = (studentId) => {
    setDeleteStudentOpen(true);
    setStudent(studentId);
  }

  return (
    <>
    <Typography className={classes.heading} variant='h5' color='textPrimary'>Settings</Typography>
    {userIsTeacher ? 'This user is a teacher' : null}

    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="course data">
        <TableBody>
          <CourseNameRow courseId={courseId} courseData={props.courseData} canUserEdit={userIsTeacher} />
          <CourseLanguageRow courseId={courseId} courseData={props.courseData} canUserEdit={userIsTeacher} />
          <CourseLevelRow courseId={courseId} courseData={props.courseData} canUserEdit={userIsTeacher} />
        </TableBody>
      </Table>
    </TableContainer>

    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="course users">
        <TableBody>
          <CourseTeachersRow courseId={courseId} courseData={props.courseData} canUserEdit={userIsTeacher} />
          <CourseStudentsRow courseId={courseId} courseData={props.courseData} handleDeleteConfirmation={handleStudentDeletePromptOpen} canUserEdit={userIsTeacher} />
        </TableBody>
      </Table>
    </TableContainer>

    {deleteStudentOpen ? <StudentDeletePrompt close={handleStudentDeletePromptClose} courseId={courseId} studentId={student} /> : null}

    </>
  );
}


const mapStateToProps = state => {
    return {
        courseData: state.course.data,
        activeUser: state.auth.userUid
    }
}
 
export default connect(mapStateToProps)(CourseSettings);