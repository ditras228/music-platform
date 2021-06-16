export interface IUser{
    _id: number
    name: string
    password: string
}
export interface UserState{
    users: IUser[]
    errors: Array<any>
    isAuth?: boolean
}

export enum UsersActionTypes{
    FETCH_USERS = 'FETCH_USERS',
    ADD_ERROR = 'ADD_ERROR',
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
    type: UsersActionTypes.ADD_ERROR
    payload: any
}
export type UserAction = FetchUsersAction | FetchUsersErrorAction | Login