import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"

const Notifications = ({ children }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 fixed top-1 right-0">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <NotificationComp />
                <DropdownMenuSeparator />
                <NotificationComp />
            </DropdownMenuContent>
        </DropdownMenu>

    )
}


const NotificationComp = () => {
    return (
        <DropdownMenuItem>
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-3 items-center">
                    <Avatar>
                        <AvatarImage className="relative z-10" src="https://github.com/shadcn.png" />
                        <AvatarFallback className="relative z-10">U</AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg">User 1</h2>
                </div>
                <div className="flex justify-center gap-2 items-center">
                    <Button variant="chat">Accept</Button>
                    <Button variant="destructive">Reject</Button>
                </div>
            </div>
        </DropdownMenuItem>
    )
}

export default Notifications