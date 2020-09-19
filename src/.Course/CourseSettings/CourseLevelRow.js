import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, IconButton, TextField, Select, MenuItem } from '@material-ui/core';
import { Edit as EditIcon, Done as SaveIcon, Close as CancelIcon } from '@material-ui/icons';
import { languages, levels } from '../../.Utilities/maps';
import firebase from '../../.Database/firebase';


const CourseNameRow = ({ courseId, courseData }) => {
    const [editible, setEditible] = useState(false);
    const [level, setLevel] = useState('');

    useEffect(() => {
        setLevel(courseData.level);
    },[courseData.level])

    const handleUpdate = () => {
        const db = firebase.firestore();
        const courseRef = db.collection('courses').doc(courseId);

        courseRef.update({
            level: level
        })
        .then(() => {
            console.log("Course level successfully updated!");
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
                Language
            </TableCell>
            <TableCell align="right">
                {editible
                    ?   <Select id='select-level' value={level} onChange={(event) => setLevel(event.target.value)}>
                            {Object.entries(levels).map(([levelCode, levelName]) => {
                                return <MenuItem key={levelCode} value={levelCode}>{levelCode} {levelName}</MenuItem>
                            })}
                        </Select>
                    :   `${courseData.level} ${levels[courseData.level]}`
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