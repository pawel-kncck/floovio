import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Select, MenuItem, FormGroup, makeStyles, FormControl, InputLabel, Button } from '@material-ui/core';
import firebase, { storage } from '../.Database/firebase';
import { connect } from 'react-redux';
import { makeId } from '../.Utilities/Utilities';
import * as dbFunctions from '../.Database/BackendFunctions';

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
    profilePic: {
        borderRadius: '50%',
        display: 'block',
        height: '200px',
        width: '200px',
    },
    imageButtonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    imageinput: {
        display: 'none'
    },
    textField: {
        margin: '10px 0'
    }
})

const EditProfileDialog = (props) => {
    const classes = useStyles();
    const [displayName, setDisplayName] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (firebase.auth().currentUser) {
            dbFunctions.getUserDataById(firebase.auth().currentUser.uid)
            .then(fullUserObject => {
                setDisplayName(fullUserObject.displayName);
                setProfilePicUrl(fullUserObject.profilePic);
                setEmail(fullUserObject.email);
            })
            .catch(error => {
                console.error(error);
            })
        }
    },[firebase.auth().currentUser])

    const handleUpdate = () => {
        const userUpdatedObject = {
            displayName: displayName,
            profilePic: profilePicUrl
        }
        
        dbFunctions.updateUserData(props.userId, userUpdatedObject)
        props.close();
    }

    const handleClick = () => {
        document.getElementById('imageupload').click();
    }

    const firebaseImageUpload = (file) => {
        const fileId = makeId(8);
        const storageRef = storage.ref(`/profile_pics/${fileId}`);

        storageRef.put(file)
            .then(() => {
                return storageRef.getDownloadURL()
            })
            .then(url => {
                setProfilePicUrl(url);
            })
            .catch(err => {
                console.error(err)
            })
    };

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle id="edit-profile-dialog">Edit your profile</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <img src={profilePicUrl} alt="profile picture" className={classes.profilePic} />
                <div className={classes.imageButtonContainer}>
                    <input 
                        type="file" 
                        id='imageupload' 
                        name='imageupload' 
                        accept="image/x-png,image/gif,image/jpeg"
                        className={classes.imageinput} 
                        onChange={(e) => firebaseImageUpload(e.target.files[0])} />
                    <Button variant="outlined" onClick={handleClick}>Change image</Button>
                </div>
                <FormGroup>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.textField}
                            margin="normal"
                            id="display-name"
                            label="Display Name"
                            type="text"
                            value={displayName}
                            onChange={(event) => setDisplayName(event.target.value)}
                            fullWidth
                        />
                        <TextField
                            disabled
                            className={classes.textField}
                            margin="normal"
                            id="email"
                            label="Email"
                            type="email"
                            value={email}
                            fullWidth
                        />
                    </FormControl>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" size="small" onClick={props.close}>Cancel</Button>
                <Button variant="contained" color="primary" size="small" onClick={handleUpdate}>Save changes</Button>
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