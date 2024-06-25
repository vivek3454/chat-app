import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaBell } from "react-icons/fa6"

const Notifications = ({children}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 fixed top-1 right-0">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

{/* <DropdownMenu>
            <DropdownMenuTrigger dir="right" className="relative w-full flex justify-between items-center">
                <span className="min-[770px]:hidden font-bold">Notification</span>
                <FaBell size={24} cursor={"pointer"} />
                {count > 0 && <div className="w-5 h-5 bg-red-400 rounded-full flex justify-center items-center absolute top-1 -right-1">{count}</div>}
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="fixed -right-36 min-[770px]:-right-10 w-[300px] max-h-[300px] overflow-y-auto -top-64 min-[770px]:top-5 p-3">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allNotifications.length === 0 && isLoading &&
                    <Spinner size={30} />
                }

                {allNotifications.length === 0 && !isLoading &&
                    <div className="flex flex-col items-center">
                        <img className="w-28 h-28" src={notificationNotFound} alt="notificationNotFound" />
                    </div>
                }
                {allNotifications.map((notification, index) => (
                    <DropdownMenuItem key={notification?._id} className="mt-2">
                        <div onClick={() => handleOnClick(notification, index)} className="flex relative gap-2 items-center cursor-pointer">
                            <div className="w-9 h-9 cursor-pointer rounded-full">
                                <img className="w-full h-full rounded-full" src={admin} alt="" />
                            </div>
                            <div>
                                <div>{notification?.date && format(new Date(notification?.date), "dd, MMM, yyyy")}</div>
                                <p className="line-clamp-1 w-[250px] text-gray-600">{notification?.message}</p>
                            </div>
                            {!notification?.read && <div className="w-2 h-2 bg-red-400 rounded-full absolute top-4 -left-1"></div>}
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu> */}

export default Notifications