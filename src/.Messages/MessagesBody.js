import React, { useEffect, useRef } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import ChatItem from './ChatItem';

const useStyles = makeStyles({
  root: {
      zIndex: 130,
      overflowY: 'auto',
      backgroundColor: '#f5f5f5',
      padding: '10px 0',
  },
  emptyContainer: {
    width: '100%',
    textAlign: 'center',
    margin: '30px 10px'
  }
})

const MessagesBody = ({ messages, courseId, currentUser }) => {
  const messagesEndRef = useRef(null)
  const classes = useStyles();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div>
        {(messages.length > 0)
            ?   messages.map((el,index) => <ChatItem key={index} body={el.body} msg={el} courseId={courseId} currentUser={currentUser} />)
            :   (<div className={classes.emptyContainer}>
                  <img src='https://firebasestorage.googleapis.com/v0/b/dialetton.appspot.com/o/static%2Fcover_mounth.png?alt=media&token=b837b7e9-88a4-4340-b406-3972c291713d' alt='empty chat image' width='150px' />
                  <Typography variant='h5' color='textPrimary'>No messages</Typography>
                  <Typography variant='body2' color='textPrimary'>Type your fist message!</Typography>
                </div>)
        }
        <div ref={messagesEndRef} />
    </div>
  )
}

export default MessagesBody;