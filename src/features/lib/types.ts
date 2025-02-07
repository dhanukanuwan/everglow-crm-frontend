import { combineReducers } from '@reduxjs/toolkit'
const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof rootReducer>

export interface UserInfo {
    email?: string
    exp?: number
    iat?: number
    id?: number | string
}

export interface LoginCreds {
    email: string
    password: string
    remember?: boolean
}

export interface UserJWTToken {
    jwt: string
}

export interface SuccessLoginResponse {
    success: boolean
    data: UserJWTToken
}

export interface ErrorLoginResponse {
    success?: boolean
    error?: string
    message?: string
}

export interface AuthState {
    loading: boolean
    userInfo: UserInfo
    userToken: string | null
    error: string | null | boolean
    success: boolean
}

export interface LoginFormValues {
    user_email: string
    user_password: string
    user_remember: boolean
}