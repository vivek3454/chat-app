import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    notificationCount: 0,
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
    },
});

export const {
    handleOpenClose,
    incrementNotification,
    resetNotificationCount
} = chat.actions;
export default chat