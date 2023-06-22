export interface SignIn {
    email: string;
    password: string;
}

export interface CurrentUser {
    token?: string
    uid?: string
    role?: string
    email?: string | null
}