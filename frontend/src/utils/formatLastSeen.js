import { formatDistanceToNow } from "date-fns";

export function formatLastSeen(userId, timestamp, onlineUsers) {
    console.log("userId", userId);
    console.log("timestamp", timestamp);
    console.log("onlineUsers", onlineUsers);

    if (onlineUsers.includes(userId)) {
        return "Online";
    }

    const lastSeenDate = timestamp ? new Date(timestamp) : new Date();

    return `Active ${formatDistanceToNow(lastSeenDate, { addSuffix: true })}`;
}
