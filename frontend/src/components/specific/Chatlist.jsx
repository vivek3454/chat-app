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
          _id={chat?._id}
          sameSender={chatId === chat?._id}
          newMessageAlert={{
            chatId:chat?._id,
            count:2
          }}
          name={chat?.name}
          isOnline={chatId === chat?._id}
          groupChat={chat?.groupChat}
        />
      ))}
    </div>
  )
}

export default memo(Chatlist)