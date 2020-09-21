import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import firebase from '../.Database/firebase';
import SendBox from './SendBox';
import { connect } from 'react-redux';
import ChatItem from './ChatItem';
import useWindowDimensions from './withWindowDimentions';
import MessagesBody from './MessagesBody';

const useStyles = makeStyles({
    root: {
        width: '100%',
        zIndex: 130,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-1px 2px 2px rgba(0, 0, 0, 0.2)',
        boxSizing: 'border-box', 
    },
    sendBox: {
        zIndex: 130,
        margin: '10px',
    },
})

const Messages = (props) => {
    const classes = useStyles();
    const [messageList,setMessageList] = useState([]);
    const { height, width } = useWindowDimensions();
    const messagesEndRef = useRef(null);
    const currentUser = firebase.auth().currentUser;
    

    useEffect(() => {
        const db = firebase.firestore()
        return db.collection("courses").doc(props.courseId).onSnapshot((snapshot) => {
            let tempMessageArray = [];
            snapshot.data().messages.map(msg => {
                tempMessageArray.push(msg);
            })
            setMessageList(tempMessageArray);
        });
    },[props])

    // useEffect(scrollToBottom, [messageList]);

    // const scrollToBottom = () => {
    //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    // }

    let bodyHeight = height - 165;

    const divBodyStyle = {
        zIndex: 130,
        height: bodyHeight,
        overflowY: 'auto',
        backgroundColor: '#f5f5f5',
        padding: '10px 0',
    };

    return (
        <div className={classes.root}>
            
            <div style={divBodyStyle}>
                {(messageList) ? <MessagesBody messages={messageList} courseId={props.courseId} currentUser={currentUser} /> : null}
                {/* {(messageList.length > 0)
                    ?   messageList.map((el,index) => <ChatItem key={index} body={el.body} />)
                    : null
                }
                <div ref={messagesEndRef} /> */}
            </div>
            
            <div className={classes.sendBox}>
                {(props.user) ? <SendBox courseId={props.courseId} user={props.user}/> : null}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.auth.userUid,
    }
}
 
export default connect(mapStateToProps,null)(Messages);