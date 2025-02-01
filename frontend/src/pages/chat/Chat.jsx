import { useInfiniteScrollTop } from "6pp";
import AppLayout from "@/components/layouts/AppLayout";
import TypingLoader from "@/components/loaders/TypingLoader";
import MessageComp from "@/components/shared/MessageComp";
import ChatHeader from "@/components/specific/ChatHeader";
import FileMenu from "@/components/specific/FileMenu";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "@/constants/events";
import { useErrors, useSocketEvents } from "@/hooks/hooks";
import { useChatDetailsQuery, useGetMessagesQuery } from "@/redux/api/api";
import { removeNewMessagesAlert } from "@/redux/reducers/chat";
import { getSocket } from "@/socket";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Chat = ({ chatId, user }) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId, populate: true });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const members = chatDetails?.data?.chat?.members?.map((member) => member?._id);

  // console.log("message", message);
  console.log("oldMessagesChunk", oldMessagesChunk);

  useEffect(() => {
    if (oldMessagesChunk.isError) return navigate("/");
  }, [oldMessagesChunk.isError]);

  const newMessagesListener = useCallback((data) => {
    if (data.chatId !== chatId) return;

    setMessages((prev) => [...prev, data.message]);
  }, [chatId]);

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      console.log("data.chatId", data);
      console.log("chatId", chatId);

      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
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

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user?._id, members });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user?._id, members });
    };
  }, [chatId]);

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  useErrors(errors);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, userTyping]);

  return (
    <div className="h-[calc(100vh-4rem)] w-full relative">
      <div className="h-[89%]">
        <ChatHeader chatDetails={chatDetails?.data?.chat} />
        <div ref={containerRef} className="p-2 bg-blue- h-[87%] overflow-x-hidden overflow-y-auto flex flex-col gap-2">
          {allMessages.map((message) => (
            <MessageComp key={message._id} message={message} user={user} />
          ))}
          {userTyping && <TypingLoader />}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="mt-auto flex items-start gap-3 bg-white z-30 p-2 h-[11%]">
        <FileMenu chatId={chatId} />

        <form onSubmit={handleSendMessage} className="w-full flex gap-2">
          <Input onChange={messageOnChange} value={message} placeholder="Type Message Here..." />
          <Button disabled={!message.trim()} type="submit" variant="chat">
            <MdSend />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AppLayout()(Chat);