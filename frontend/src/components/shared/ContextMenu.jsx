import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

const ContextMenuComp = ({ children, handleDeleteChat }) => {
    // handleDeleteChat(e, _id, groupChat)
    return (
        <ContextMenu>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>

    )
}

export default ContextMenuComp