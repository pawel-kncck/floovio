import React, { useEffect, useState } from 'react';
import firebase from '../.Database/firebase';
import { storage } from '../.Database/firebase'
import { fetchCourse } from '../.Store/course.actions';
import { makeStyles, Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { connect } from 'react-redux';
import { makeId } from '../.Utilities/Utilities';
import { updateMediaList } from '../.Database/db.course';

const useStyles = makeStyles({
    root: {
        width: '100%',
        margin: "0 20px",
        padding: 0,
    },
    listContainer: {
        margin: 0,
        padding: 0,
    },
    buttomContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    }
})

const useForceUpdate = () => useState()[1];

const MediaList = (props) => {
    const classes = useStyles();
    const [mediaList, setMediaList] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const forceUpdate = useForceUpdate();

    // useEffect(() => {
    //     var storage = firebase.storage();
    //     var storageRef = storage.ref();
    //     var listRef = storageRef.child(`media/${props.courseId}`);
    //     let listOfFiles = [];

    //     listRef.listAll()
    //         .then(function(res) {
    //             res.items.forEach
    //         })
    //         .catch(err => {
    //             console.error(err)
    //         });
    // },[]);

    useEffect(() => {
        console.log(props.media);
    },[])

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
                updateMediaList(props.courseId, props.media, fileId, file.name, url)
            })
            .catch(err => {
                console.error(err)
            })
    };

    // const handleClick = () => {
    //     document.getElementById('imageupload').click();
    // }

    return (
        <div className={classes.root}>
            <ul className={classes.listContainer}>
                {Object.keys(props.media).map(key => {
                    return <li key={key}>{props.media[key].name}, code: {key}</li>
                })}
            </ul>
            <div className={classes.buttomContainer}>
                <input 
                    type="file" 
                    id='imageupload' 
                    name='imageupload' 
                    accept="image/x-png,image/gif,image/jpeg"
                    // className={classes.imageinput} 
                    onChange={(e) => setSelectedFile(e.target.files[0])} />
                <Button color="primary" variant="contained" size="small" onClick={firebaseImageUpload}>Upload</Button>
            </div>
        </div>

    );
}

const mapStateToProps = state => {
    return {
        media: state.course.data.media,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourse: (id) => {dispatch(fetchCourse(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MediaList);