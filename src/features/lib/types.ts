export interface UserInfo {
    email?: string
    exp?: number
    iat?: number
    id?: number
}

export interface LoginCreds {
    email: string
    password: string
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