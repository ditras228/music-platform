export interface IUser{
    _id: number
    name: string
    password: string
}
export interface UserState{
    errors: Array<any>
}

export enum UsersActionTypes{
    FETCH_USERS = 'FETCH_USERS',
    ADD_ERROR = 'ADD_ERROR',
    LOGIN = 'LOGIN',
    IS_LOADING = 'IS_LOADING'
}
interface IsLoading{
    type: UsersActionTypes.IS_LOADING
    payload: boolean
}
interface Login{
    type: UsersActionTypes.LOGIN
    payload: IUser
}
interface FetchUsersAction{
    type: UsersActionTypes.FETCH_USERS
    payload: IUser
}
interface FetchUsersErrorAction{
    type: UsersActionTypes.ADD_ERROR
    payload: any
}
export type UserAction = FetchUsersAction | FetchUsersErrorAction | Login | IsLoading