import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAsyncMutation } from "@/hooks/hooks";
import { useSendFriendRequestMutation } from "@/redux/api/api";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6"

const UserComp = ({ user, handler = "", isAdded }) => {
    const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

    const handleSendFriendReq = async () => {
        await sendFriendRequest("Sending friend request...", { userId: user?._id });
    }

    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex gap-3 items-center">
                <Avatar>
                    <AvatarImage className="relative z-10" src={user?.avatar ? user?.avatar : "https://github.com/shadcn.png"} />
                    <AvatarFallback className="relative z-10">U</AvatarFallback>
                </Avatar>
                <h2 className="text-lg">{user?.name}</h2>
            </div>
            <button type="button" onClick={handler ? () => handler(user?._id) : handleSendFriendReq} className={`w-10 h-10 rounded-full ${isAdded ? "bg-destructive" : "bg-blue-400"} flex justify-center cursor-pointer items-center`}>
                {isAdded ? <FaMinus className="text-white" />
                    : <FaPlus className="text-white" />}
            </button>
        </div>
    )
}

export default UserComp