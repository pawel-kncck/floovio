import React, { useEffect, useState } from 'react';
import firebase from '../.Database/firebase';
import { storage } from '../.Database/firebase'
import { fetchCourse } from '../.Store/course.actions';
import { makeStyles, Button, List, Divider } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { connect } from 'react-redux';
import { makeId } from '../.Utilities/Utilities';
import { addMedia } from '../.Database/db.media';
import MediaListItem from './MediaListItem';
import MediaList from './MediaList';

const useStyles = makeStyles({
    root: {
        width: '100%',
        margin: 0,
        padding: 0,
    },
    listContainer: {
        margin: 0,
        padding: 0,
    },
    buttomContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        margin: '10px 0',
        width: 'auto',
    }
})

const MediaSidebar = (props) => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();

    const firebaseImageUpload = () => {
        const fileId = makeId(8);
        const file = selectedFile;
        const storageRef = storage.ref(`/media/${props.courseId}/${file.name}`);

        const metadata = {
            customMetadata: {
                code: fileId,
            }
        }

        storageRef.put(file, metadata)
            .then(res => {
                return storageRef.getDownloadURL()
            })
            .then(url => {
                const fileMetadata = {
                    url: url,
                    id: fileId,
                    name: file.name
                }
                console.log(fileMetadata);
                console.log("CourseID: " + props.courseId);
                console.log("User: " + props.user);
                addMedia(props.courseId, fileMetadata, props.user)
            })
            .catch(err => {
                console.error(err)
            })
    };

    return (
        <div className={classes.root}>
            <MediaList courseId={props.courseId} />
            <div className={classes.buttomContainer}>
                <input 
                    type="file" 
                    id='imageupload' 
                    name='imageupload' 
                    accept="image/x-png,image/gif,image/jpeg"
                    // className={classes.imageinput} 
                    onChange={(e) => setSelectedFile(e.target.files[0])} />
                <Button 
                    className={classes.button} 
                    startIcon={<CloudUploadIcon />}
                    color="primary" 
                    variant="contained" 
                    size="small" 
                    onClick={firebaseImageUpload}
                    >Upload</Button>
            </div>
        </div>

    );
}

const mapStateToProps = state => {
    return {
        user: state.auth.userUid,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourse: (id) => {dispatch(fetchCourse(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MediaSidebar);