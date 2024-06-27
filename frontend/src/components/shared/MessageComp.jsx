import { format, formatDistanceToNow } from 'date-fns'
import React, { memo } from 'react'

const MessageComp = ({ message, user }) => {
    // const { _id, sender, content, attachments = [], createdAt } = message;
    // const sameSender = _id === user._id
    // const timeAgo = format(new Date(), "hh:mm");
    const timeAgo = formatDistanceToNow(new Date(), { addSuffix: true });

    return (
        // <div className={`flex ${true ? "justify-end" : "justify-start"}`}>
        //     <div className='w-fit p-3 rounded bg-white'>
        //     MessageComp
        //     <div className='text-end text-sm text-gray-400'>{timeAgo}</div>
        //     </div>
        // </div>
        <div className="chat chat-start">
            <div className="chat-header">
                chat 1
                <time className="text-xs opacity-50 ml-2">{timeAgo}</time>
            </div>
            <div className="chat-bubble bg-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos!</div>
            <div className="chat-footer opacity-50">Delivered</div>
        </div>
    )
}

export default memo(MessageComp)