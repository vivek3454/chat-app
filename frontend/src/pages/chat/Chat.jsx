import { useInfiniteScrollTop } from "6pp";
import AppLayout from "@/components/layouts/AppLayout";
import MessageComp from "@/components/shared/MessageComp";
import ChatHeader from "@/components/specific/ChatHeader";
import FileMenu from "@/components/specific/FileMenu";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { NEW_MESSAGE } from "@/constants/events";
import { useErrors, useSocketEvents } from "@/hooks/hooks";
import { useChatDetailsQuery, useGetMessagesQuery } from "@/redux/api/api";
import { getSocket } from "@/socket";
import { useCallback, useRef, useState } from "react";
import { MdSend } from "react-icons/md";


const Chat = ({ chatId, user }) => {
  const socket = getSocket();

  const containerRef = useRef(null);
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

  // let oldMessages = oldMessagesChunk?.data?.messages || [];

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const allMessages = [...oldMessages, ...messages];

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  useErrors(errors);

  return (
    <div className="h-[calc(100vh-4rem)] relative">
      <div className="h-[89%]">
        <ChatHeader chatDetails={chatDetails?.data?.chat} />
        <div ref={containerRef} className="p-2 bg-blue- h-[87%] overflow-y-auto">
          {allMessages.map((message) => (
            <MessageComp key={message._id} message={message} user={user} />
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-start gap-3 bg-white z-30 p-2 h-[11%]">
        <FileMenu />

        <Input onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Type Message Here..." />
        <Button disabled={!message.trim()} onClick={handleSendMessage} variant="chat">
          <MdSend />
        </Button>
      </div>
    </div>
  )
}

export default AppLayout()(Chat);