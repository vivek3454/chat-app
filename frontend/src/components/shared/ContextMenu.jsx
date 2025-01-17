import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { MdDelete } from "react-icons/md"
import { RxExit } from "react-icons/rx";

const ContextMenuComp = ({ children, handleDeleteChat, groupChat }) => {
    // handleDeleteChat(e, _id, groupChat)
    return (
        <ContextMenu>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>
            <ContextMenuContent>
                {groupChat ?
                    <ContextMenuItem className="flex gap-2 items-center" onClick={handleDeleteChat}>
                        <RxExit className="text-lg" />
                        Leave
                    </ContextMenuItem>
                    :
                    <ContextMenuItem className="flex gap-2 items-center" onClick={handleDeleteChat}>
                        <MdDelete className="text-lg" />
                        Delete
                    </ContextMenuItem>
                }
            </ContextMenuContent>
        </ContextMenu>

    )
}

export default ContextMenuComp