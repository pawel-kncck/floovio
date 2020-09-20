import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, IconButton, TextField, Select, MenuItem } from '@material-ui/core';
import { Edit as EditIcon, Done as SaveIcon, Close as CancelIcon } from '@material-ui/icons';
import { languages, levels } from '../../.Utilities/maps';
import firebase from '../../.Database/firebase';


const CourseNameRow = ({ courseId, courseData, canUserEdit }) => {
    const [editible, setEditible] = useState(false);
    const [language, setLanguage] = useState('');

    useEffect(() => {
        setLanguage(courseData.language);
    },[courseData.language])

    const handleUpdate = () => {
        const db = firebase.firestore();
        const courseRef = db.collection('courses').doc(courseId);

        courseRef.update({
            language: language
        })
        .then(() => {
            console.log("Course language successfully updated!");
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
                    ?   <Select id='select-language' value={language} onChange={(event) => setLanguage(event.target.value)}>
                            {Object.entries(languages).map(([languageCode, languageName]) => {
                                return <MenuItem key={languageCode} value={languageCode}>{languageName}</MenuItem>
                            })}
                        </Select>
                    :   languages[courseData.language]
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
                    :   <IconButton onClick={() => setEditible(true)} disabled={!canUserEdit}>
                            <EditIcon />
                        </IconButton>
                }
            </TableCell>
        </TableRow>
    );
}
 
export default CourseNameRow;