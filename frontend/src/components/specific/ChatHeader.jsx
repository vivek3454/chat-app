import group from "@/assets/group.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleOpenClose } from "@/redux/reducers/chat";
import { Phone, Video } from 'lucide-react';
import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import { useSocketEvents } from "@/hooks/hooks";
import { ONLINE_USERS, USER_LAST_SEEN } from "@/constants/events";
import { getSocket } from "@/socket";
import { formatLastSeen } from "@/utils/formatLastSeen";
import { useParams } from "react-router-dom";

const ChatHeader = ({ chatDetails }) => {
    const { groupChat=true, name, members = [] } = chatDetails || {};
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const params = useParams();
    const socket = getSocket();
    const [lastSeen, setLastSeen] = useState(new Date());
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [userId, setUserId] = useState("");
    const [chatingUser, setChatingUser] = useState("");
    console.log("user", user);
    console.log("chatDetails", chatDetails);

    useEffect(() => {
        const getUserId = members?.find(member => member?._id !== user?._id)
        console.log("getUserId", getUserId);
        if (getUserId) {
            setChatingUser(getUserId)
            setUserId(getUserId?._id);
            setLastSeen(getUserId?.lastSeen);
        }
    }, [members, params?.chatId,onlineUsers])

    console.log(1 + "1" - 1);


    const updateUserLastSeen = useCallback((data) => {
        console.log("updateUserLastSeen", data);
        setLastSeen(data?.lastSeen);
        setUserId(data?.userId);
    }, []);
    const onlineUsersListener = useCallback((data) => {
        console.log("onlineUsers", data);

        setOnlineUsers(data);
    }, []);

    const eventHandlers = {
        [USER_LAST_SEEN]: updateUserLastSeen,
        [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandlers);

    const lastSeenTime = groupChat ? "" : formatLastSeen(userId, lastSeen, onlineUsers)
    console.log("lastSeenTime", lastSeenTime);


    return (
        <div className="w-full h-[70px] flex p-4 justify-between items-center border-b bg-white">
            <div className="flex items-center gap-2">
                <SlArrowLeft onClick={() => dispatch(handleOpenClose())} className="block sm:hidden cursor-pointer text-lg" />
                {groupChat ?
                    <Avatar>
                        <AvatarImage className="relative z-10" src={group} />
                        <AvatarFallback className="relative z-10">U</AvatarFallback>
                    </Avatar>
                    : <Avatar>
                        <AvatarImage className="relative z-10" src={chatingUser?.avatar?.url} />
                        <AvatarFallback className="relative z-10">U</AvatarFallback>
                    </Avatar>}
                <div className="flex flex-col">
                    <span className="font-medium">{groupChat ? name : chatingUser?.name}</span>
                    <span className="text-xs">{lastSeenTime}</span>
                </div>
            </div>

            {/* <div className="flex gap-2">
                <Button
                    size="sm"
                    variant="ghost"
                >
                    <Phone size={20} className="text-muted-foreground" />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                >
                    <Video size={20} className="text-muted-foreground" />
                </Button>
            </div> */}
        </div>
    )
}

export default ChatHeader