import React from 'react';
import { connect } from 'react-redux';
import { Select, makeStyles, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import { setActiveStudent } from '../../.Store/course.actions';

const useStyles = makeStyles({
    root: {
        display: 'block',
        width: '100%'
    }
})

const StudentSelector = (props) => {
    const classes = useStyles();
    const studentsArray = props.students;

    console.log(props.students);

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel id="active-student-selector-label">Student</InputLabel>
                <Select
                    id="active-student-selector"
                    labelId="active-student-selector-label"
                    value={props.activeStudent}
                    onChange={(e) => props.setActiveStudent(e.target.value)}
                >
                    {studentsArray.map((studentId) => {
                        return <MenuItem key={studentId} value={studentId}>{props.usersData[studentId].displayName}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    );
}
 
const mapStateToProps = state => {
    return {
        students: state.course.data.roles.students,
        usersData: state.course.data.usersData,
        activeStudent: state.course.activeStudent,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveStudent: userId => {dispatch(setActiveStudent(userId))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(StudentSelector);