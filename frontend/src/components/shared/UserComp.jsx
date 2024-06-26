import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaPlus } from "react-icons/fa6"

const UserComp = () => {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex gap-3 items-center">
                <Avatar>
                    <AvatarImage className="relative z-10" src="https://github.com/shadcn.png" />
                    <AvatarFallback className="relative z-10">U</AvatarFallback>
                </Avatar>
                <h2 className="text-lg">User 1</h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-400 flex justify-center items-center">
                <FaPlus className="text-white" />
            </div>
        </div>
    )
}

export default UserComp