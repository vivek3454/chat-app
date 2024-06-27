import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { memo } from "react"
import { Link } from "react-router-dom"
import group from "@/assets/group.png"


const ChatItem = ({
    avatar = [],
    name,
    _id,
    lastMessage,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat
}) => {
    return (
        <Link to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
            <div className={`hover:bg-gray-50 cursor-pointer ${sameSender && "bg-gray-50"}`}>
                <div className="flex gap-4 p-2">
                    <span className="relative">
                        {groupChat ?
                            <Avatar>
                                <AvatarImage className="relative z-10" src={group} />
                                <AvatarFallback className="relative z-10">U</AvatarFallback>
                            </Avatar>
                            : <Avatar>
                                <AvatarImage className="relative z-10" src="https://github.com/shadcn.png" />
                                <AvatarFallback className="relative z-10">U</AvatarFallback>
                            </Avatar>}
                        {isOnline && <div className="w-3 h-3 rounded-full z-20 absolute bottom-2 right-0 bg-green-400"></div>}
                    </span>
                    <div>
                        <h2 className="text-lg font-semibold">Chat 1</h2>
                        <p className="text-sm text-gray-400 line-clamp-1">new message</p>
                    </div>
                    <div className="ml-auto flex flex-col justify-between items-end">
                        <p className="text-xs text-gray-400">24/05/2024</p>
                        {newMessageAlert.count && <div className="w-5 h-5 rounded-full bg-red-400 text-white flex justify-center items-center">{newMessageAlert.count}</div>}
                    </div>
                </div>
                <Separator />
            </div>
        </Link>
    )
}

export default memo(ChatItem)