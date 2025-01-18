import React, { memo } from 'react'
import ChatItem from '../shared/ChatItem'

const Chatlist = ({
  chats = [],
  width = "100%",
  chatId,
  onlineUsers = [],
  newMessagesAlert
}) => {
  return (
    <div className=' sm:block'>
      {chats?.map((chat, i) => (
        <ChatItem
          key={i}
          _id={chat?._id}
          sameSender={chatId === chat?._id}
          newMessageAlert={newMessagesAlert}
          avatar={chat?.avatar}
          name={chat?.name}
          isOnline={chatId === chat?._id}
          groupChat={chat?.groupChat}
          index={i}
        />
      ))}
    </div>
  )
}

export default memo(Chatlist)