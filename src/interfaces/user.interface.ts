import { IPost } from "./post.interface"

export interface IUser { 
    id: number
    username: string
    createdAt: Date
}

export interface IAuthUserResponse extends IUser {
    posts: IPost[]
}

export type AuthUserBody = {
    id?: number
    username: string
    password: string
}

export type EditUserBody = {
    username?: string
    password?: string
}



