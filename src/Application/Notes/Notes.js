import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import firebase from '../../firebase';
import SendBox from './SendBox';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        height: '100vh - 48px',
        width: '268px',
        zIndex: 130,
        position: 'fixed',
        top: '48px',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-1px 2px 2px rgba(0, 0, 0, 0.2)',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'auto',        
    },
    header: {
        zIndex: 130,
        padding: '10px',
        fontSize: '20px',
        color: '#555',
    },
    notesBody: {
        zIndex: 130,
        flex: 1,
        overflowY: 'auto',
        backgroundColor: '#f5f5f5',
        padding: '10px 0',
    },
    noteItem: {
        padding: '7px',
        margin: '7px',
        minWidth: '50px',
        maxWidth: '248px',
        color: '#555',
        backgroundColor: '#fff',
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
        display: 'inline-block',
        fontSize: '13px',
        borderRadius: '2px',
        transition: 'box-shadow 0.3s',
        '&:hover': {
            boxShadow: '1px 1px 3px 2px rgba(0, 0, 0, 0.1)',
        }

    },
    noteOuter: {
        display: 'block',
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
        return db.collection("courses").doc(props.match.params.id).onSnapshot((snapshot) => {
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
            <div className={classes.header}>
                Notes
            </div>
            <div className={classes.notesBody}>
                {(notesArray.length > 0)
                    ?   notesArray.map((el,index) => {
                            return (
                                <div className={classes.noteOuter}>
                                    <div key={'nt' + index} className={classes.noteItem}>{el.body}</div>
                                </div>
                                )
                        })
                    : null
                }
            </div>
            <div className={classes.sendBox}>
                {(props.user) ? <SendBox courseId={props.match.params.id} user={props.user.uid}/> : null}
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