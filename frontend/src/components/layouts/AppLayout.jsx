/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */

import { useParams } from "react-router-dom"
import Header from "../header/Header"
import Title from "../shared/Title"
import Chatlist from "../specific/Chatlist"
import { useMyChatsQuery } from "@/redux/api/api"
import { useDispatch, useSelector } from "react-redux"
import ChatSkeleton from "../skeleton/ChatSkeleton"
import { useErrors, useSocketEvents } from "@/hooks/hooks"
import DataNotFound from "../shared/DataNotFound"
import { getSocket } from "@/socket"
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "@/constants/events"
import { useCallback } from "react"
import { incrementNotification } from "@/redux/reducers/chat"

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const dispatch = useDispatch();
        const { isOpen } = useSelector((state) => state.chat);
        const { user } = useSelector((state) => state.auth);
        console.log("user", user);


        const params = useParams();
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

        console.log("error", error);


        useErrors([{ isError, error }]);
        console.log("chats", data);

        const chatId = params?.chatId

        const socket = getSocket();

        const newRequestListener = useCallback(() => {
            dispatch(incrementNotification());
        }, [dispatch]);

        const newMessageAlertListener = useCallback(
            // (data) => {
            //     if (data.chatId === chatId) return;
            //     dispatch(setNewMessagesAlert(data));
            // },
            // [chatId]
        );

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST]: newRequestListener,
            // [REFETCH_CHATS]: refetchListener,
            // [ONLINE_USERS]: onlineUsersListener,
        };

        useSocketEvents(socket, eventHandlers);


        return (
            <>
                <Title title={"Chat app"} description={"This is description"} />
                <Header />
                <section className="grid grid-cols-1 sm:grid-cols-[40%_60%] md:grid-cols-[30%_70%] h-[calc(100vh-4rem)]">
                    <div className={`${isOpen ? "hidden sm:block" : "block"}`}>
                        {data?.chats.length > 0 && <Chatlist chats={data?.chats} chatId={chatId} />}

                        {data?.chats.length === 0 && isLoading &&
                            <ChatSkeleton />
                        }

                        {data?.chats.length === 0 && !isLoading &&
                            <DataNotFound name="Chats" />
                        }
                    </div>
                    <div className={`bg-gray-100 ${isOpen ? "block" : "hidden"} sm:block`}>
                        <WrappedComponent {...props} chatId={chatId} user={user} />
                    </div>
                </section>
            </>
        )
    }
}

export default AppLayout