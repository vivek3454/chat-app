/* eslint-disable react/display-name */

import { useParams } from "react-router-dom"
import Header from "../header/Header"
import Title from "../shared/Title"
import Chatlist from "../specific/Chatlist"
import { useMyChatsQuery } from "@/redux/api/api"

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const params = useParams();
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

        console.log("chats", data);


        return (
            <>
                <Title title={"Chat app"} description={"This is description"} />
                <Header />
                <section className="grid grid-cols-1 sm:grid-cols-[40%_60%] md:grid-cols-[30%_70%] h-[calc(100vh-4rem)]">
                    <div className="">
                        {isLoading ?
                            "Loading..."
                            : <Chatlist chats={data?.chats} chatId={params?.chatId} />
                        }
                    </div>
                    <div className="bg-gray-100 hidden sm:block">
                        <WrappedComponent {...props} />
                    </div>
                </section>
                {/* <footer>Footer</footer> */}
            </>
        )
    }
}

export default AppLayout