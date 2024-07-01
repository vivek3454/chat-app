import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Separator } from "../ui/separator"
import group from "@/assets/group.png"

const GroupItem = ({ chatId, _id, avatar }) => {
    return (
        <div
            // onClick={(e) => chatId === _id && e.preventDefault()}
            className={`hover:bg-gray-50 cursor-pointer`}>
            <div className="flex gap-4 p-2">
                <Avatar>
                    <AvatarImage className="relative z-10" src={group} />
                    <AvatarFallback className="relative z-10">U</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-lg font-semibold">Chat 1</h2>
                </div>
            </div>
            <Separator />
        </div>
    )
}

export default GroupItem