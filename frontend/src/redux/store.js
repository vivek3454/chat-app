import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import loadingSlice from "./reducers/loading";
import errorSlice from "./reducers/error";
import api from "./api/api";

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [loadingSlice.name]: loadingSlice.reducer,
        [errorSlice.name]: errorSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (mid) => [...mid(), api.middleware],
});

export default store;
