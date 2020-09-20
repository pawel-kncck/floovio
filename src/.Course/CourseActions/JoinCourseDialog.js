import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Select, MenuItem, FormGroup, makeStyles, FormControl, InputLabel, Button } from '@material-ui/core';
import firebase from '../../.Database/firebase';
import * as dbFunctions from '../../.Database/BackendFunctions';
import ErrorAlert from '../../.Alerts/ErrorAlert';

const useStyles = makeStyles({
    root: {
        maxWidth: "700px"
    },
    dialogContent: {
        marginBottom: "30px"
    },
})

const JoinCourseDialog = (props) => {
    const classes = useStyles();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);

    const isValid = (code !== '')

    //props open, close
    const handleJoinCourse = () => {
        const userId = firebase.auth().currentUser.uid;
        const courseId = code;
        const role = 'student';

        const courseRef = firebase.firestore().collection("courses").doc(courseId);

        courseRef.get()
            .then(doc => {
                if (doc.exists) {
                    dbFunctions.addUserToCourse(userId, courseId, role)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        handleAlertOpen(err.message);
                    })
                } else {
                    handleAlertOpen("Invalid code!");
                }
            })
            .catch(err => {
                handleAlertOpen(err.message);
            })
            
        handleClose();
    }

    const handleClose = () => {
        props.onClose();
        setCode('');
    }

    const handleAlertOpen = (error) => {
        setAlertOpen(true);
        setError(error);
    }

    const handleAlertClose = () => {
        setAlertOpen(false);
        setError('');
    }

    return (
        <>
        <Dialog open={props.open} onClose={handleClose} className={classes.root}>
            <DialogTitle id="add-new-course-dialog">Join a course</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText>
                    Please enter invite code below
                </DialogContentText>
                <FormGroup>
                    <FormControl className={classes.formControl}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="invite-code"
                            label="Invite Code"
                            type="text"
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            fullWidth
                        />
                    </FormControl>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="primary" disabled={!isValid} onClick={handleJoinCourse}>Join</Button>
            </DialogActions>
        </Dialog>
        <ErrorAlert message={error} open={alertOpen} onClose={handleAlertClose} />
        </>
    );
}
 
export default JoinCourseDialog;