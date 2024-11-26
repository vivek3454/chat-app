import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import loadingSlice from "./reducers/loading";
import errorSlice from "./reducers/error";

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [loadingSlice.name]: loadingSlice.reducer,
        [errorSlice.name]: errorSlice.reducer,
    },
});

export default store;
