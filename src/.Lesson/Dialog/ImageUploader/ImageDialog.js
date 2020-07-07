import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Input, makeStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import { firebaseImageUpload } from './db.image';
import { storage } from '../../../.Database/firebase';
import { v4 as uuid } from 'uuid'
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';

const useStyles = makeStyles({
    imageinput: {
        width: '0.1px',
        height: '0.1px',
        opacity: 0,
        position: 'absolute',
        zIndex: -1,
    },
    imagePlaceholder: {
        width: '400px',
        height: '300px',
        margin: '10px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#777',
        border: '3px dashed #ccc',
    },
    uploadedImage: {
        margin: '10px 20px',

    }
})


const AddImage = (props) => {
    const classes = useStyles();
    const [imageAsFile,setImageAsFile] = useState({});
    const [imageAsUrl,setImageAsUrl] = useState("");

    const handleClick = () => {
        document.getElementById('imageupload').click();
    }

    // const handleImageAsFile = (event) => {
    //     const loadedImage = event.target.files[0];
    //     console.log(typeof event.target.files[0]);
    //     console.log(event.target.files[0]);
    //     setImageAsFile(loadedImage);

        // const image = e.target.files[0]
        // setImageAsFile(imageFile => (image))
    // }

    // const handleUpload = () => {
    //     console.log(imageAsFile)
    //     firebaseImageUpload(imageAsFile)
    //         .then(res => {
    //             setImageAsUrl(res)
    //         })
    //     // if typeof (imageAsFile 

    // }

    

    const firebaseImageUpload = (event) => {
        const imageId = uuid();
        storage.ref(`/images/${imageId}`).put(event.target.files[0])
            .then(res => {
                return storage.ref(`/images/${imageId}`).getDownloadURL()
            })
            .then(url => {
                setImageAsUrl(url)
            })
            .catch(err => {
                console.error(err)
            })
    };

    return (
        <Dialog open>
            <DialogTitle>
                Add an image
            </DialogTitle>
            <DialogContent>
                <input 
                    type="file" 
                    id='imageupload' 
                    name='imageupload' 
                    accept="image/x-png,image/gif,image/jpeg"
                    className={classes.imageinput} 
                    onChange={(e) => firebaseImageUpload(e)} />
                <label htmlFor='imageupload'>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                    onClick={handleClick}
                >
                    {(imageAsUrl === '') ? 'Upload' : 'Change'}
                </Button>
                </label>
                {/* <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                    onClick={firebaseImageUpload}
                >
                    Upload
                </Button> */}
                {(imageAsUrl === '') 
                    ? <div className={classes.imagePlaceholder}><PanoramaOutlinedIcon fontSize="large" /></div> 
                    : <img src={imageAsUrl} className={classes.uploadedImage} alt='supporting illustration' /> }
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleCancel} color="primary">
                    Cancel
                </Button>
                {(props.activeExercise === -1) 
                ?   <Button autoFocus onClick={() => props.handleSave(imageAsUrl)} color="primary" variant="contained">
                        Add to lesson
                    </Button>
                :   <Button autoFocus onClick={() => console.log('Save clicked')} color="primary" variant="contained">
                        Save changes
                    </Button>}
            </DialogActions>
        </Dialog>
    );
}
 
export default AddImage;