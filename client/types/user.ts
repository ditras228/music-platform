export interface UserState{
    errors: Array<any>
    isDark: boolean
}

export enum UsersActionTypes{
    ADD_ERROR = 'ADD_ERROR',
    IS_DARK = 'IS_DARK'
}
interface IsDark{
    type: UsersActionTypes.IS_DARK
    payload: any
}
interface FetchUsersErrorAction{
    type: UsersActionTypes.ADD_ERROR
    payload: any
}
export type UserAction =  FetchUsersErrorAction | isDark