import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, IconButton, TextField } from '@material-ui/core';
import { Edit as EditIcon, Done as SaveIcon, Close as CancelIcon } from '@material-ui/icons';
import firebase from '../../.Database/firebase';


const CourseNameRow = ({ courseId, courseData }) => {
    const [editible, setEditible] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        setName(courseData.name);
    },[courseData.name])

    const handleUpdate = () => {
        const db = firebase.firestore();
        const courseRef = db.collection('courses').doc(courseId);

        courseRef.update({
            name: name
        })
        .then(() => {
            console.log("Course name successfully updated!");
            setEditible(false);
        })
        .catch(error => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                Course name
            </TableCell>
            <TableCell align="right">
                {editible
                    ?   <TextField variant='standard' value={name} onChange={(event) => setName(event.target.value)} />
                    :   courseData.name
                }
            </TableCell>
            <TableCell align="right">
                {editible
                    ?   <>
                            <IconButton onClick={handleUpdate}>
                                <SaveIcon />
                            </IconButton>
                            <IconButton onClick={() => setEditible(false)}>
                                <CancelIcon />
                            </IconButton>
                        </>
                    :   <IconButton onClick={() => setEditible(true)}>
                            <EditIcon />
                        </IconButton>
                }
            </TableCell>
        </TableRow>
    );
}
 
export default CourseNameRow;