import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true
};


const loading = createSlice({
    name: "loading",
    initialState,
    reducers: {
        handleLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
});

export const { handleLoading } = loading.actions;
export default loading