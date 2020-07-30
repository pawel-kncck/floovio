import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Select, MenuItem, FormGroup, makeStyles, FormControl, InputLabel, Button } from '@material-ui/core';
import firebase from '../../.Database/firebase';

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

    const isValid = (code !== '')

    //props open, close
    const handleJoinCourse = () => {
        const joinCourse = firebase.functions().httpsCallable('joinCourse');
        const data = {
            studentId: firebase.auth().currentUser.uid,
            courseId: code
        }
        
        joinCourse(data)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            })
        handleClose();
    }

    const handleClose = () => {
        props.onClose();
        setCode('');
    }

    return (
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
    );
}
 
export default JoinCourseDialog;