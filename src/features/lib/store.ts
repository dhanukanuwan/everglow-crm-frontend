import { configureStore, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import { authApi } from '../../services/auth/authService';
import contactsReducer from '../contacts/contactsSlice';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AuthState, ContactsState } from './types';

const persistConfig = {
    key: "everglowRoot",
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    contacts: contactsReducer,
    [authApi.reducerPath]: authApi.reducer
});

interface InitialRootReducerType {
    auth?: AuthState
    contacts?: ContactsState
}

const appReducer = (state: InitialRootReducerType, action: PayloadAction<string>) => {
    if (action.type === 'LOGOUT_RESET') {
        storage.removeItem('persist:everglowRoot')
        localStorage.removeItem( 'userToken' );
      return rootReducer(undefined, action)
    }
  
    return rootReducer(state, action)
}

const persistedReducer = persistReducer<any, any>(persistConfig, appReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
    }).concat(authApi.middleware)
})

export default store;
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch