import { NEW_MESSAGE_ALERT } from "@/constants/events";
import { getOrSaveFromStorage } from "@/utils/features";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    notificationCount: 0,
    newMessagesAlert: getOrSaveFromStorage({
        key: NEW_MESSAGE_ALERT,
        get: true,
    }) || [
            {
                chatId: "",
                count: 0,
            },
        ],
};


const chat = createSlice({
    name: "chat",
    initialState,
    reducers: {
        handleOpenClose: (state) => {
            state.isOpen = !state.isOpen
        },
        incrementNotification: (state) => {
            state.notificationCount += 1;
        },
        resetNotificationCount: (state) => {
            state.notificationCount = 0;
        },
        setNewMessagesAlert: (state, action) => {
            const chatId = action.payload.chatId;

            const index = state.newMessagesAlert.findIndex(
                (item) => item.chatId === chatId
            );

            if (index !== -1) {
                state.newMessagesAlert[index].count += 1;
            } else {
                state.newMessagesAlert.push({
                    chatId,
                    count: 1,
                });
            }
        },
        removeNewMessagesAlert: (state, action) => {
            state.newMessagesAlert = state.newMessagesAlert.filter(
                (item) => item.chatId !== action.payload
            );
        },
    },
});

export const {
    handleOpenClose,
    incrementNotification,
    resetNotificationCount,
    setNewMessagesAlert,
    removeNewMessagesAlert
} = chat.actions;
export default chat