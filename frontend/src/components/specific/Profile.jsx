import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "../ui/input"
import { FaRegUser } from "react-icons/fa6"
import { FaRegEdit } from "react-icons/fa"
import { MdEdit, MdOutlineInfo } from "react-icons/md"
import { useSelector } from "react-redux"
import { format, formatDistance } from "date-fns"

const Profile = ({ isProfileOpen, setIsProfileOpen }) => {
    const { user } = useSelector((state) => state.auth)

    function JoinedDate(joinedDate) {
        console.log("joinedDate", joinedDate);
        const formattedDistance = formatDistance(new Date(joinedDate), new Date(), { addSuffix: true });
        return formattedDistance;
    }

    return (
        <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <SheetContent side="right" className="p-4 flex flex-col justify-between">
                <div className="mt-8">
                    <Avatar className="w-36 h-36 mx-auto rounded-full">
                        <AvatarImage className="relative z-10" src={user?.avatar?.url || ""} />
                        <AvatarFallback className="relative z-10">U</AvatarFallback>
                    </Avatar>
                    <div className="flex items-start gap-5 mt-3">
                        <FaRegUser />
                        <div>
                            <h2 className="font-semibold max-w-72 w-full mx-auto text-gray-500 -mt-1">Name</h2>
                            <h2 className="font-semibold max-w-72 w-full mx-auto">{user?.name}</h2>
                            {/* <Input disabled={true} className="text-lg disabled:border-none font-semibold max-w-72 w-full mx-auto text-center mt-3 text-black" value="Name" /> */}
                        </div>
                        <MdEdit className="ml-auto text-lg text-blue-400 cursor-pointer" />
                    </div>
                    <div className="flex items-start gap-5 mt-3">
                        <MdOutlineInfo />
                        <div>
                            <h2 className="font-semibold max-w-72 w-full mx-auto text-gray-500 -mt-1">About</h2>
                            <p className="text-sm max-w-72 w-full mx-auto font-semibold">{user?.bio}</p>
                            {/* <Input disabled={true} className="text-lg disabled:border-none font-semibold max-w-72 w-full mx-auto text-center mt-3 text-black" value="Name" /> */}
                        </div>
                        <MdEdit className="ml-auto text-lg text-blue-400 cursor-pointer" />
                    </div>
                </div>
                <p className="text-gray-400 text-sm text-center mt-auto">Joined {user?.createdAt && JoinedDate(user.createdAt)}</p>
            </SheetContent>
        </Sheet>
    )
}

export default Profile