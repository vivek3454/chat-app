import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Video } from 'lucide-react';
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { handleOpenClose } from "@/redux/reducers/chat";
import { SlArrowLeft } from "react-icons/sl";

const ChatHeader = () => {
    const dispatch = useDispatch();

    return (
        <div className="w-full h-[70px] flex p-4 justify-between items-center border-b bg-white">
            <div className="flex items-center gap-2">
                <SlArrowLeft onClick={() => dispatch(handleOpenClose())} className="block sm:hidden cursor-pointer text-lg" />
                <Avatar>
                    <AvatarImage className="relative z-10" src="https://github.com/shadcn.png" />
                    <AvatarFallback className="relative z-10">U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium">name</span>
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