import AppLayout from "@/components/layouts/AppLayout"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdOutlineAttachFile, MdSend } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MessageComp from "@/components/shared/MessageComp";
import ChatHeader from "@/components/specific/ChatHeader";


const Chat = () => {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="h-[89%]">
        <ChatHeader />
        <div className="p-2">
          <MessageComp />
        </div>
      </div>
      <div className="mt-auto flex gap-3 bg-white p-2 h-[11%]">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="secondary">
              <MdOutlineAttachFile />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Input placeholder="Type Message Here..." />
        <Button variant="chat">
          <MdSend />
        </Button>
      </div>
    </div>
  )
}

export default AppLayout()(Chat);