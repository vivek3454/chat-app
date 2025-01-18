import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("chat-app-user") || null,
    isAdmin: false,
    loader: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload;
            state.loader = false;
            localStorage.setItem("chat-app-user", action.payload);
        },
        userNotExists: (state) => {
            localStorage.setItem("chat-app-user", null);
            state.user = null;
            state.loader = false;
        },
        changeAdminState: (state, payload) => {
            state.isAdmin = payload;
        },
    },

});

export default authSlice;
export const { userExists, userNotExists, changeAdminState } = authSlice.actions;
