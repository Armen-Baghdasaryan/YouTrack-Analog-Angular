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

export interface IProjects {
    name: string
    description: string
    userId?: string
    number?: string 
}