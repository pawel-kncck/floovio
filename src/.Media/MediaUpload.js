import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Input, makeStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import { firebaseImageUpload } from './db.image';
import { storage } from '../.Database/firebase';
import { setDialog, addImage } from '../.Store/lesson.actions';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import { connect } from 'react-redux';
import { makeId } from '../.Utilities/Utilities';

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
    const [imageAsUrl,setImageAsUrl] = useState("");

    const handleClick = () => {
        document.getElementById('imageupload').click();
    }

    const firebaseImageUpload = (event) => {
        const file = event.target.files[0]
        const metadata = {
            customMetadata: {
                code: makeId(8)
            }
        }

        storage.ref(`/media/${props.courseId}/${file.name}`).put(file, metadata)
            .then(res => {
                console.log("Upload successful");
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
                {(imageAsUrl === '') 
                    ? <div className={classes.imagePlaceholder}><PanoramaOutlinedIcon fontSize="large" /></div> 
                    : <img src={imageAsUrl} className={classes.uploadedImage} alt='supporting illustration' /> }
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleCancel} color="primary">
                    Cancel
                </Button>
                {(props.index === -1) 
                    ?   <Button autoFocus onClick={() => props.handleSave(imageAsUrl)} color="primary" variant="contained">
                            Add to media
                        </Button>
                    :   <Button autoFocus onClick={() => console.log('Save clicked')} color="primary" variant="contained">
                            Save changes
                        </Button>}
            </DialogActions>
        </Dialog>
    );
}
const mapStateToProps = state => {
    return {
        index: state.lesson.dialog.index,
        courseId: state.course.data.uid,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDialog: (open,type,index,html,json) => {dispatch(setDialog(open,type,index,html,json))},
        handleCancel: () => {dispatch(setDialog(false, null, null, "", {}))},
        handleSave: (url) => {dispatch(addImage(url))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddImage);