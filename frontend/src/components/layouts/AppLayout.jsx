/* eslint-disable react/display-name */

import { useParams } from "react-router-dom"
import Header from "../header/Header"
import Title from "../shared/Title"
import Chatlist from "../specific/Chatlist"

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const params = useParams();
        return (
            <>
                <Title title={"Chat app"} description={"This is description"} />
                <Header />
                <section className="grid grid-cols-1 sm:grid-cols-[40%_60%] md:grid-cols-[30%_70%] h-[calc(100vh-4rem)]">
                    <div className="">
                        <Chatlist chats={["1", "2", "3", "4", "5"]} chatId={params?.chatId} />
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