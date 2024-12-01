import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
};


const chat = createSlice({
    name: "chat",
    initialState,
    reducers: {
        handleOpenClose: (state) => {
            state.isOpen = !state.isOpen
        }
    },
});

export const { handleOpenClose } = chat.actions;
export default chat