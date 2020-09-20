import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, IconButton, TextField, Select, MenuItem, Chip, Avatar } from '@material-ui/core';
import { Edit as EditIcon, Done as SaveIcon, Close as CancelIcon } from '@material-ui/icons';
import { languages, levels } from '../../.Utilities/maps';
import firebase from '../../.Database/firebase';


const CourseStudentsRow = ({ courseId, courseData, canUserEdit, ...props }) => {
    const students = courseData.roles ? courseData.roles.students : [];

    const handleDelete = (student) => {
        props.handleDeleteConfirmation(student)
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                Student(s)
            </TableCell>
            <TableCell align="right">
                {students.map(studentId => {
                    return (
                        <Chip
                            key={studentId}
                            disabled={!canUserEdit}
                            avatar={<Avatar alt='profile pic' src={courseData.usersData[studentId].profilePic} />}
                            label={courseData.usersData[studentId].displayName}
                            onDelete={() => handleDelete(studentId)}
                            deleteIcon={<CancelIcon />}
                        />
                    )
                })
                }
            </TableCell>
        </TableRow>
    );
}
 
export default CourseStudentsRow;