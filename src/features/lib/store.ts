import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import { authApi } from '../../services/auth/authService';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware().concat(authApi.middleware)
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch