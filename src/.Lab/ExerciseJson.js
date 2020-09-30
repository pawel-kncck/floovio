import React, { useState } from 'react';
import firebase from '../.Database/firebase';
import { Button, makeStyles, Paper, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles({
    root: {
        margin: 'auto',
        maxWidth: '750px',
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        margin: '20px 0',
    },
    buttonContainer: {
        display: 'inline-flex',
    },
    paper: {
        marginTop: '20px',
    }
})



const ExerciseJson = () => {
    const classes = useStyles();
    const [courseId, setCourseId] = useState('');
    const [exerciseId, setExerciseId] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const valid = Boolean(courseId) && Boolean(exerciseId);

    const handleGetClick = () => {
        const docRef = firebase.firestore().collection("courses").doc(courseId).collection("exercises").doc(exerciseId)
        
        docRef.get()
            .then(doc => {
                if (doc.exists) {
                    setJsonOutput(doc.data().content.json);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
    }

    return (
        <div className={classes.root}>
            <TextField
                id='course-id'
                value={courseId}
                onChange={(event) => setCourseId(event.target.value)}
                label='Course ID'
                fullWidth
                className={classes.textField}
            />
            <TextField
                id='exercise-id'
                value={exerciseId}
                onChange={(event) => setExerciseId(event.target.value)}
                label='Exercise ID'
                fullWidth
                className={classes.textField}
            />
            <div className={classes.root}>
                <Button 
                    onClick={handleGetClick}
                    disabled={!valid}
                    color='primary'
                    variant='contained'
                >
                Get
                </Button>
            </div>
            <Paper square className={classes.root}>
                <pre>
                    {JSON.stringify(jsonOutput, null, 4)}
                </pre>
            </Paper>
        </div>
    );
}

export default ExerciseJson;
