import group from "@/assets/group.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleOpenClose } from "@/redux/reducers/chat";
import { Phone, Video } from 'lucide-react';
import { SlArrowLeft } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

const ChatHeader = ({ chatDetails }) => {
    const { groupChat, name, members =[] } = chatDetails || {};
    const dispatch = useDispatch();

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
                        <AvatarImage className="relative z-10" src={members[0]?.avatar} />
                        <AvatarFallback className="relative z-10">U</AvatarFallback>
                    </Avatar>}
                <div className="flex flex-col">
                    <span className="font-medium">{groupChat ? name : name?.split("-")[0]}</span>
                    <span className="text-xs">Active 2 mins ago</span>
                </div>
            </div>

            <div className="flex gap-2">
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
            </div>
        </div>
    )
}

export default ChatHeader