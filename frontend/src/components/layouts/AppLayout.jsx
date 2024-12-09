/* eslint-disable react/display-name */

import { useParams } from "react-router-dom"
import Header from "../header/Header"
import Title from "../shared/Title"
import Chatlist from "../specific/Chatlist"
import { useMyChatsQuery } from "@/redux/api/api"
import { useDispatch, useSelector } from "react-redux"
import ChatSkeleton from "../skeleton/ChatSkeleton"
import { useErrors } from "@/hooks/hooks"
import DataNotFound from "../shared/DataNotFound"
import { getSocket } from "@/socket"

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const dispatch = useDispatch();
        const { isOpen } = useSelector((state) => state.chat);
        console.log("isOpen", isOpen);


        const params = useParams();
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

        useErrors([{ isError, error }]);
        console.log("chats", data);

        const socket = getSocket();
        console.log("socket", socket);


        return (
            <>
                <Title title={"Chat app"} description={"This is description"} />
                <Header />
                <section className="grid grid-cols-1 sm:grid-cols-[40%_60%] md:grid-cols-[30%_70%] h-[calc(100vh-4rem)]">
                    <div className={`${isOpen ? "hidden sm:block" : "block"}`}>
                        {data?.chats.length > 0 && <Chatlist chats={data?.chats} chatId={params?.chatId} />}

                        {data?.chats.length === 0 && isLoading &&
                            <ChatSkeleton />
                        }

                        {data?.chats.length === 0 && !isLoading &&
                            <DataNotFound name="Chats" />
                        }
                    </div>
                    <div className={`bg-gray-100 ${isOpen ? "block" : "hidden"} sm:block`}>
                        <WrappedComponent {...props} />
                    </div>
                </section>
            </>
        )
    }
}

export default AppLayout