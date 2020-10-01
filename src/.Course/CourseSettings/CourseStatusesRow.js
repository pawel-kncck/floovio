import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, IconButton, TextField, Select, MenuItem, Chip, Avatar } from '@material-ui/core';
import { Edit as EditIcon, Done as SaveIcon, Close as CancelIcon } from '@material-ui/icons';
import { languages, levels } from '../../.Utilities/maps';
import firebase from '../../.Database/firebase';
import ColoredChip from '../../Components/ColoredChip';


const CourseStudentsRow = ({ courseData, ...props }) => {
    const statuses = courseData.statuses ? courseData.statuses : [];

    const handleDelete = (student) => {
        props.handleDeleteConfirmation(student)
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                Status
            </TableCell>
            <TableCell align="right">
                {statuses.map(status => {
                    return (
                        <ColoredChip
                            key={status.name}
                            rgbBackgroung={status.rgb}
                            // avatar={<Avatar alt='profile pic' src={courseData.usersData[studentId].profilePic} />}
                            label={status.name}

                            // onDelete={() => handleDelete(studentId)}
                            // deleteIcon={<CancelIcon />}
                        />
                    )
                })
                }
            </TableCell>
        </TableRow>
    );
}
 
export default CourseStudentsRow;