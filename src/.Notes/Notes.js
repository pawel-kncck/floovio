import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import firebase from '../.Database/firebase';
import SendBox from './SendBox';
import { connect } from 'react-redux';
import ChatItem from './ChatItem';

const useStyles = makeStyles({
    root: {
        height: '100vh - 500px',
        width: '100%',
        zIndex: 130,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-1px 2px 2px rgba(0, 0, 0, 0.2)',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'auto',        
    },
    notesBody: {
        zIndex: 130,
        flex: 1,
        overflowY: 'auto',
        backgroundColor: '#f5f5f5',
        padding: '10px 0',
    },
    sendBox: {
        zIndex: 130,
        margin: '10px',
    },
})

const Notes = (props) => {
    const classes = useStyles();
    const [notesArray,setNotesArray] = useState([]);

    useEffect(() => {
        const db = firebase.firestore()
        console.log(props);
        return db.collection("courses").doc(props.courseId).onSnapshot((snapshot) => {
            console.log(snapshot.data());
            let notesArray = [];
            snapshot.data().notes.map(note => {
                notesArray.push(note);
                console.log(note);
            })
            setNotesArray(notesArray);
        });
    },[props])

    

    return (
        <div className={classes.root}>
            <div className={classes.notesBody}>
                {(notesArray.length > 0)
                    ?   notesArray.map((el,index) => <ChatItem key={index} body={el.body} />)
                    : null
                }
            </div>
            <div className={classes.sendBox}>
                {(props.user) ? <SendBox courseId={props.courseId} user={props.user.uid}/> : null}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.auth.authUser,
    }
}
 
export default connect(mapStateToProps,null)(Notes);