import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import ChatItem from './ChatItem';

const useStyles = makeStyles({
  root: {
      zIndex: 130,
      overflowY: 'auto',
      backgroundColor: '#f5f5f5',
      padding: '10px 0',
  },
})

const MessagesBody = ({ messages, courseId }) => {
  const messagesEndRef = useRef(null)
  const classes = useStyles();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div>
        {(messages.length > 0)
            ?   messages.map((el,index) => <ChatItem key={index} body={el.body} msg={el} courseId={courseId} />)
            :   null
        }
        <div ref={messagesEndRef} />
    </div>
  )
}

export default MessagesBody;