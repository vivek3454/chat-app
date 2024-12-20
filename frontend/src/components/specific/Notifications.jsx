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
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "@/redux/api/api";
import { useAsyncMutation, useErrors } from "@/hooks/hooks";
import Spinner from "../shared/Spinner";
import { useDispatch } from "react-redux";
import { resetNotificationCount } from "@/redux/reducers/chat";

const Notifications = ({ children }) => {
    const { isLoading, data, error, isError } = useGetNotificationsQuery();
    const dispatch = useDispatch();

    console.log("notifications", data);
    const handleNotificationOpen = () => {
        dispatch(resetNotificationCount());

    }

    const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

    const friendRequestHandler = async ({ id, accept }) => {
        await acceptRequest("Accepting...", { requestId: id, accept });
    };

    useErrors([{ error, isError }]);

    return (
        <DropdownMenu onOpenChange={handleNotificationOpen}>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 fixed top-1 right-0">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        {data?.allRequests.length > 0 ? (
                            data?.allRequests?.map(({ sender, _id }) => (
                                <div key={_id}>
                                    <DropdownMenuSeparator />
                                    <NotificationComp handler={friendRequestHandler} sender={sender} id={_id} />
                                </div>
                            ))
                        ) : (
                            <p>0 notifications</p>
                        )}
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


const NotificationComp = ({ sender, handler, id }) => {
    return (
        <div className="p-2">
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-3 items-center">
                    <Avatar>
                        <AvatarImage className="relative z-10" src={sender?.avatar} />
                        <AvatarFallback className="relative z-10">U</AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg">{sender?.name}</h2>
                </div>
                <div className="flex justify-center gap-2 items-center">
                    <Button onClick={() => handler({ id, accept: true })} variant="chat">Accept</Button>
                    <Button variant="destructive">Reject</Button>
                </div>
            </div>
        </div>
    )
}

export default Notifications