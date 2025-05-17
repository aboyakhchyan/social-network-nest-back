import { IComment } from "./comment.interface"
import { IUser } from "./user.interface"

export interface IPost {
    id: number
    title: string
    content: string
    createdAt: Date
}

export interface IPostResponse extends IPost {
    comments: IComment[]
    author: IUser
    likes: ILike[]
}

export type CreatePostBody = Omit<IPost, 'id' | 'createdAt'>

export type EditPostBody = Partial<CreatePostBody>

export interface ILike {
    user: IUser
}