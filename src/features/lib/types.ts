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
    tokenActive: boolean
}

export interface LoginFormValues {
    user_email: string
    user_password: string
    user_remember: boolean
}

export type ContactsListData = {
    id: number;
    name: string;
    totalBlacklisted: number;
    totalSubscribers: number;
    uniqueSubscribers: number;
    folderId: number
}

export interface ListContacts {
    email: string
    id: number
    emailBlacklisted: boolean
    smsBlacklisted: boolean
    createdAt: string
    modifiedAt: string
    listIds: number[]
    listUnsubscribed: number[]
    attributes: {[key: string]: string}
}

export interface ListContactsResponse {
    contacts?: ListContacts[]
    count?: number
}

export type BrevoSuccessResponse = {
    lists?: ContactsListData[];
    count?: number;
}

export type BrevoErrorResponse = {
    code: string;
    message: string;
}

export type ListContactsType = {
    key?: string
    id?: number
    contacts?: ListContacts[],
    count?: number
}

export interface ContactsState {
    loading: boolean
	contactsLists: BrevoSuccessResponse
    listContacts: ListContactsType[]
    listContactsError: string | null | boolean
	error: string | null | boolean
	success: boolean
}