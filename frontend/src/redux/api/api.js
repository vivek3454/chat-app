import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
    tagTypes: ["Chat", "User", "Message"],

    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: "/chat/my",
                credentials: "include",
            }),
            providesTags: ["Chat"],
        }),
        searchUser: builder.query({
            query: (name) => ({
                url: `/user/search?name=${name}`,
                credentials: "include",
            }),
            providesTags: ["User"],
        }),
    }),
});

export default api;
export const {
    useMyChatsQuery,
    useLazySearchUserQuery
} = api;
