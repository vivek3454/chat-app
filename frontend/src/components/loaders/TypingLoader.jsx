import React from 'react'

const TypingLoader = () => {
    return (
        <div className="chat">
            <div className="chat-bubble bg-white rounded-md flex items-center">
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounceCustom"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounceCustom [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounceCustom [animation-delay:0.4s]"></div>
                </div>
            </div>
        </div>

    )
}

export default TypingLoader