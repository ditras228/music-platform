export interface IUser{
    _id: number
    name: string
    password: string
}
export interface UserState{
    users: IUser[]
    error: string
    isAuth?: boolean
}

export enum UsersActionTypes{
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
    LOGIN = 'LOGIN'
}
interface Login{
    type: UsersActionTypes.LOGIN
    payload: IUser[]
}
interface FetchUsersAction{
    type: UsersActionTypes.FETCH_USERS
    payload: IUser[]
}
interface FetchUsersErrorAction{
    type: UsersActionTypes.FETCH_USERS_ERROR
    payload: string
}
export type UserAction = FetchUsersAction | FetchUsersErrorAction | Login