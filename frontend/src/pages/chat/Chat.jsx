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
import { getSocket } from "@/socket";
import { useCallback, useState } from "react";
import { NEW_MESSAGE } from "@/constants/events";
import { useChatDetailsQuery } from "@/redux/api/api";
import { useSocketEvents } from "@/hooks/hooks";


const Chat = ({ chatId, user }) => {
  const socket = getSocket();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const members = chatDetails?.data?.chat?.members;

  console.log("message", message);

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const eventHandler = {
    [NEW_MESSAGE]: newMessagesListener,
  };

  useSocketEvents(socket, eventHandler);

  const handleSendMessage = () => {
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="h-[89%]">
        <ChatHeader />
        <div className="p-2">
          {messages.map((message) => (
            <MessageComp key={message._id} message={message} user={user} />
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-start gap-3 bg-white p-2 h-[11%]">
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

        <Input onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Type Message Here..." />
        <Button disabled={!message.trim()} onClick={handleSendMessage} variant="chat">
          <MdSend />
        </Button>
      </div>
    </div>
  )
}

export default AppLayout()(Chat);