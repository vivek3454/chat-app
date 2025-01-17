import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { memo, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import group from "@/assets/group.png"
import { useDispatch } from "react-redux"
import { handleOpenClose } from "@/redux/reducers/chat"
import ContextMenuComp from "./ContextMenu"
import { useAsyncMutation } from "@/hooks/hooks"
import { useDeleteChatMutation, useLeaveGroupMutation } from "@/redux/api/api"

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
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("newMessageAlert", newMessageAlert);

    const [deleteChat, _, deleteChatData] = useAsyncMutation(
        useDeleteChatMutation
    );

    const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
        useLeaveGroupMutation
    );

    const handleLeaveGroup = () => {
        leaveGroup("Leaving Group...", _id);
    };

    const handleDeleteChat = () => {
        deleteChat("Deleting Chat...", _id);
    };

    useEffect(() => {
        if (deleteChatData || leaveGroupData) navigate("/");
    }, [deleteChatData, leaveGroupData]);


    return (
        <Link onClick={() => dispatch(handleOpenClose())} to={`/chat/${_id}`}>
            <ContextMenuComp
                handleDeleteChat={groupChat ? handleLeaveGroup : handleDeleteChat}
                groupChat={groupChat}
            >
                <div className={`hover:bg-gray-50 cursor-pointer ${sameSender && "bg-gray-50"}`}>
                    <div className="flex gap-4 p-2">
                        <span className="relative">
                            {groupChat ?
                                <Avatar>
                                    <AvatarImage className="relative z-10" src={group} />
                                    <AvatarFallback className="relative z-10">U</AvatarFallback>
                                </Avatar>
                                : <Avatar>
                                    <AvatarImage className="relative z-10" src={avatar[0]} />
                                    <AvatarFallback className="relative z-10">U</AvatarFallback>
                                </Avatar>}
                            {isOnline && <div className="w-3 h-3 rounded-full z-20 absolute bottom-2 right-0 bg-green-400"></div>}
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold">{name}</h2>
                            <p className="text-sm text-gray-400 line-clamp-1">new message</p>
                        </div>
                        <div className="ml-auto flex flex-col justify-between items-end">
                            <p className="text-xs text-gray-400">24/05/2024</p>
                            {newMessageAlert.find((item) => item.chatId === _id)?.count && <div className="w-5 h-5 rounded-full bg-red-400 text-white flex justify-center items-center">{newMessageAlert.find((item) => item.chatId === _id)?.count}</div>}
                        </div>
                    </div>
                    <Separator />
                </div>
            </ContextMenuComp>
        </Link>
    )
}

export default memo(ChatItem)