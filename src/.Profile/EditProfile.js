import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Select, MenuItem, FormGroup, makeStyles, FormControl, InputLabel, Button } from '@material-ui/core';
import firebase from '../.Database/firebase';
import { connect } from 'react-redux';

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

const EditProfileDialog = (props) => {
    const classes = useStyles();

    const [displayName, setDisplayName] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('');

    useEffect(() => {
        setDisplayName(props.userData.displayName);
        setProfilePicUrl(props.userData.profilePic);
    },[props])

    const handleUpdate = () => {
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(props.userId);

        userRef.update({
            displayName: displayName,
            profilePic: profilePicUrl,
        })
        .then(function() {
            console.log("User data successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating user data: ", error);
        });

        props.close();
    }

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle id="edit-profile-dialog">Edit your profile</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                {/* <DialogContentText>
                    To create new course, please enter course name in the form below, select language and level. The course will be visible in "My Courses", but no student will have access to it.
                </DialogContentText> */}
                <FormGroup>
                    <FormControl className={classes.formControl}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="display-name"
                            label="Display Name"
                            type="text"
                            value={displayName}
                            onChange={(event) => setDisplayName(event.target.value)}
                            fullWidth
                        />
                    </FormControl>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={props.close}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleUpdate}>Save changes</Button>
            </DialogActions>

        </Dialog>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userUid,
        userData: state.auth.userData,
    }
}

export default connect(mapStateToProps)(EditProfileDialog);