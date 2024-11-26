import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isErrorModalOpen: false,
    message: "",
    type:null,
    isUnautorizedModalOpen:false,
    isLogoutBtn:false,
};

const error = createSlice({
    name: "error",
    initialState,
    reducers: {
        handleErrorModal(state, action) {
            state.isErrorModalOpen = action.payload.isOpen;
            state.message = action.payload.message;
            state.isLogoutBtn = action.payload.isLogoutBtn;
        },
        handleUnautorizedModalOpen(state, action) {
            state.isUnautorizedModalOpen = action.payload.isUnautorizedModalOpen;
        },
    },
});

export const { handleErrorModal,handleUnautorizedModalOpen } = error.actions;
export default error;