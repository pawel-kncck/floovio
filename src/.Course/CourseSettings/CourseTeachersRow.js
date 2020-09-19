import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, IconButton, TextField, Select, MenuItem, Chip, Avatar } from '@material-ui/core';
import { Edit as EditIcon, Done as SaveIcon, Close as CancelIcon } from '@material-ui/icons';
import { languages, levels } from '../../.Utilities/maps';
import firebase from '../../.Database/firebase';


const CourseTeachersRow = ({ courseId, courseData }) => {
    const teachers = courseData.roles ? courseData.roles.teachers : [];

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                Teacher(s)
            </TableCell>
            <TableCell align="right">
                {teachers.map(teacherId => {
                    return (
                        <Chip
                            key={teacherId}
                            avatar={<Avatar alt='profile pic' src={courseData.usersData[teacherId].profilePic} />}
                            label={courseData.usersData[teacherId].displayName}
                            // onDelete={handleDelete}
                            deleteIcon={<EditIcon />}
                        />
                    )
                })
                }
            </TableCell>
        </TableRow>
    );
}
 
export default CourseTeachersRow;