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
import { useChatDetailsQuery, useGetMessagesQuery } from "@/redux/api/api";
import { useErrors, useSocketEvents } from "@/hooks/hooks";


const Chat = ({ chatId, user }) => {
  const socket = getSocket();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId, populate: true });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const members = chatDetails?.data?.chat?.members?.map((member) => member?._id);

  console.log("message", message);
  console.log("members", members);

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

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];
  let oldMessages = oldMessagesChunk?.data?.messages || [];
  const allMessages = [...oldMessages, ...messages];

  useErrors(errors);

  return (
    <div className="h-[calc(100vh-4rem)] relative">
      <div className="h-[89%]">
        <ChatHeader chatDetails={chatDetails?.data?.chat} />
        <div className="p-2 bg-blue- h-[87%] overflow-y-auto">
          {allMessages.map((message) => (
            <MessageComp key={message._id} message={message} user={user} />
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-start gap-3 bg-white z-30 p-2 h-[11%]">
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