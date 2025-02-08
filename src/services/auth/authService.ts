import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState} from "../../features/lib/types";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}`,
        prepareHeaders: (headers, { getState }) => {

            const appState = getState() as RootState;
            const token = appState.auth.userToken;

            if (token) {
                headers.set('authorization', `Bearer ${token}`)  
                return headers
            }

        },
    }),
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => ({
                url: 'wp-json/wp/v2/posts/',
                method: 'GET',
            }),
        }),
        refreshUserToken: builder.query({
            query: () => ({
                url: 'wp-json/simple-jwt-login/v1/auth/refresh/',
                method: 'POST',
            }),
        }),
    }),
});

export const { useGetUserDetailsQuery, useRefreshUserTokenQuery } = authApi