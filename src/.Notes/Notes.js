import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import firebase from '../.Database/firebase';
import { connect } from 'react-redux';
import AddNote from './AddNote';


const useStyles = makeStyles({
    testroot: {
        width: '500px',
    },
})

const Notes = (props) => {
    const classes = useStyles();
    const courseIdFromPath = props.match.params.courseId || null;
    const [notesList,setNotesList] = useState([]);
    

    useEffect(() => {
        const db = firebase.firestore()
        return db.collection("courses").doc(courseIdFromPath).onSnapshot((snapshot) => {
            console.log(snapshot.data());
            let tempNotesArray = [];
            snapshot.data().notes.map(note => {
                tempNotesArray.push(note);
            })
            setNotesList(tempNotesArray);
        });
    },[props])


    return (
        <div className={classes.testroot}>
            <h1>Notes</h1>
            <ul>
                {(notesList.length > 0)
                    ?   notesList.map((el,index) => {
                        return <li key={index}>{el.body}</li>
                        })
                    :   null
                }
            </ul>
            
            <div>
                <AddNote courseId={courseIdFromPath} user={props.user} />
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        courseId: state.course.data.uid,
        user: state.auth.userUid,
    }
}
 
export default connect(mapStateToProps,null)(Notes);