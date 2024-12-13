import { fileFormat } from '@/utils/features';
import { format, formatDistanceToNow } from 'date-fns'
import React, { memo } from 'react'
import RenderAttachment from './RenderAttachment';

const MessageComp = ({ message, user }) => {
    console.log("message", message);

    const { _id, sender, content, attachments = [], createdAt } = message;
    // const attachments = []
    const sameSender = sender?._id === user?._id
    // const timeAgo = format(new Date(), "hh:mm");
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

    return (
        <div className={`chat ${sameSender ? "chat-end" : "chat-start"}`}>
            <div className="chat-header">
                {sameSender ? user?.name : sender?.name}
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
                            {RenderAttachment(fileType, attachment?.url)}
                        </a>
                    )
                })}
                {content}
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
        </div>
    )
}

export default memo(MessageComp)