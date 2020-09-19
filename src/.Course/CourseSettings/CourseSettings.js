import React from 'react';
import { Table, TableBody, Paper, TableContainer, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CourseNameRow from './CourseNameRow';
import CourseLanguageRow from './CourseLanguageRow';
import CourseLevelRow from './CourseLevelRow';

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

  return (
    <>
    <Typography className={classes.heading} variant='h5' color='textPrimary'>Settings</Typography>

    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="course data">
        <TableBody>
          <CourseNameRow courseId={courseId} courseData={props.courseData} />
          <CourseLanguageRow courseId={courseId} courseData={props.courseData} />
          <CourseLevelRow courseId={courseId} courseData={props.courseData} />
        </TableBody>
      </Table>
    </TableContainer>

    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="course users">
        <TableBody>
          <CourseNameRow courseId={courseId} courseData={props.courseData} />
          <CourseLanguageRow courseId={courseId} courseData={props.courseData} />
          <CourseLevelRow courseId={courseId} courseData={props.courseData} />
        </TableBody>
      </Table>
    </TableContainer>

    </>
  );
}


const mapStateToProps = state => {
    return {
        courseData: state.course.data
    }
}
 
export default connect(mapStateToProps)(CourseSettings);