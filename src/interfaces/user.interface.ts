export interface IAuthUserResponse {
    id: number
    username: string
    createdAt: Date
}

export interface IAuthUserBody {
    id?: number
    username: string
    password: string
}
