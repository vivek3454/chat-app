import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Separator } from "../ui/separator"
import groupImg from "@/assets/group.png"

const GroupItem = ({ chatId, group }) => {
    const { name, _id, avatar } = group;

    return (
        <Link
            to={`?group=${_id}`}
            onClick={(e) => chatId === _id && e.preventDefault()}
            className={`hover:bg-gray-50 cursor-pointer`}>
            <div className={`flex gap-4 p-2 ${chatId === _id && "bg-gray-200"}`}>
                <Avatar>
                    <AvatarImage className="relative z-10" src={groupImg} />
                    <AvatarFallback className="relative z-10">U</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-lg font-semibold">{name}</h2>
                </div>
            </div>
            <Separator />
        </Link>
    )
}

export default GroupItem