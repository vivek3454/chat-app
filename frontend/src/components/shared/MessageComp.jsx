import { fileFormat } from '@/utils/features';
import { format, formatDistanceToNow } from 'date-fns'
import React, { memo } from 'react'
import RenderAttachment from './RenderAttachment';

const MessageComp = ({ message, user }) => {
    // const { _id, sender, content, attachments = [], createdAt } = message;
    const attachments = []
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
            <div className="chat-bubble bg-white">
                {attachments.map((attachment, i) => {
                    const fileType = fileFormat(attachment?.url)
                    return (
                        <a
                            key={i}
                            href={attachment?.url}
                            target="_blank"
                            download
                        >
                            {RenderAttachment(fileType,attachment?.url)}
                        </a>
                    )
                })}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos!
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
        </div>
    )
}

export default memo(MessageComp)