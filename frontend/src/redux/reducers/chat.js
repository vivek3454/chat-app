import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    notificationCount: 0,
    newMessagesAlert: [
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
    },
});

export const {
    handleOpenClose,
    incrementNotification,
    resetNotificationCount,
    setNewMessagesAlert
} = chat.actions;
export default chat