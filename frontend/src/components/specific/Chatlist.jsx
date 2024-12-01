import React, { memo } from 'react'
import ChatItem from '../shared/ChatItem'

const Chatlist = ({
  chats = [],
  width = "100%",
  chatId,
  onlineUsers = [],
  newMessagesAlert=[
    {
      chatId:"",
      count:0
    }
  ]
}) => {
  return (
    <div className=' sm:block'>
      {chats?.map((chat, i) => (
        <ChatItem
          key={i}
          _id={chat}
          sameSender={chatId === chat}
          newMessageAlert={{
            chatId:chat,
            count:chat
          }}
          isOnline={chatId === chat}
          groupChat={chatId === chat}
        />
      ))}
    </div>
  )
}

export default memo(Chatlist)