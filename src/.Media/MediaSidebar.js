import React, { useEffect, useState } from 'react';
import firebase from '../.Database/firebase';
import { storage } from '../.Database/firebase'
import { fetchCourse } from '../.Store/course.actions';
import { makeStyles, Button, List, Divider } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { connect } from 'react-redux';
import { makeCustomId } from '../.Utilities/Utilities';
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
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '100px',
    },
    button: {
        margin: '10px 0'
    }
})

const MediaSidebar = (props) => {
    const classes = useStyles();
    const courseIdFromPath = props.match.params.courseId || null;

    const handleClick = () => {
        document.getElementById('imageupload').click();
    }

    const firebaseImageUploadB = (file) => {
        const fileId = makeCustomId();
        const fileName = file.name;
        const storageRef = storage.ref(`/media/${courseIdFromPath}/${fileId}`);

        const metadata = {
            customMetadata: {
                code: fileId,
                name: fileName
            }
        }

        storageRef.put(file, metadata)
            .then(() => {
                return storageRef.getDownloadURL()
            })
            .then(url => {
                const fileMetadata = {
                    url: url,
                    id: fileId,
                    name: fileName
                }
                addMedia(courseIdFromPath, fileMetadata, props.user)
            })
            .catch(err => {
                console.error(err)
            })
    };

    return (
        <div className={classes.root}>
            <MediaList courseId={courseIdFromPath} />
            <div className={classes.buttonContainer}>
                <input 
                    type="file" 
                    id='imageupload' 
                    name='imageupload' 
                    accept="image/x-png,image/gif,image/jpeg"
                    style={{ display: 'none' }}
                    onChange={(e) => firebaseImageUploadB(e.target.files[0])} />
                <Button 
                    className={classes.button} 
                    startIcon={<CloudUploadIcon />}
                    color="primary" 
                    variant="contained" 
                    size="small" 
                    onClick={handleClick}
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