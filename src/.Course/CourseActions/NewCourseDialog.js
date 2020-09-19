import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Select, MenuItem, FormGroup, makeStyles, FormControl, InputLabel, Button } from '@material-ui/core';
import firebase from '../../.Database/firebase';
import { languages, levels } from '../../.Utilities/maps';

const useStyles = makeStyles({
    root: {
        maxWidth: "700px"
    },
    dialogContent: {
        marginBottom: "30px"
    },
    formControl: {
        minWidth: 120,
        margin: "10px 0"
      },
})

const NewCourseDialog = (props) => {
    const classes = useStyles();

    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('');
    const [name, setName] = useState('');

    const isValid = (name !== '' && level !== '' && name !== '');

    //props open, close
    const handleCreate = () => {
        const data = {
            courseName: name,
            language: language,
            level: level,
            userId: props.userId,
        }
        const addCourse = firebase.functions().httpsCallable('addCourseWithUserId');

        addCourse(data)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            })

        props.close();
    }

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle id="add-new-course-dialog">Create new course</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText>
                    To create new course, please enter course name in the form below, select language and level. The course will be visible in "My Courses", but no student will have access to it.
                </DialogContentText>
                <FormGroup>
                    <FormControl className={classes.formControl}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="course-name"
                            label="Course Name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            fullWidth
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-language-label">Language</InputLabel>
                        <Select
                            labelId="select-language-label"
                            id="language-select"
                            value={language}
                            onChange={(event) => setLanguage(event.target.value)}
                            >
                                {Object.entries(languages).map(([languageCode, languageName]) => {
                                    return <MenuItem key={languageCode} value={languageCode}>{languageName}</MenuItem>
                                })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-level-label">Level</InputLabel>
                        <Select
                            labelId="select-level-label"
                            id="level-select"
                            value={level}
                            onChange={(event) => setLevel(event.target.value)}
                            >
                                {Object.entries(levels).map(([levelCode, levelName]) => {
                                    return <MenuItem key={levelCode} value={levelCode}>{levelCode} {levelName}</MenuItem>
                                })}
                        </Select>
                    </FormControl>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={props.close}>Cancel</Button>
                <Button variant="contained" color="primary" disabled={!isValid} onClick={handleCreate}>Create course</Button>
            </DialogActions>

        </Dialog>
    );
}
 
export default NewCourseDialog;