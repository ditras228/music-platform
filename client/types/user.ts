export interface UserState {
    errors: Array<any>
    isDark: boolean
    isLoading: boolean
    redirectTo: string
}

export enum UsersActionTypes {
    ADD_ERROR = 'ADD_ERROR',
    IS_DARK = 'IS_DARK',
    HANDLE_CHANGE_DARK = 'HANDLE_CHANGE_DARK',
    IS_LOADING = 'IS_LOADING',
    REDIRECT_TO = 'REDIRECT_TO'
}

interface IsDark {
    type: UsersActionTypes.IS_DARK
}

interface HandleChangeDark {
    type: UsersActionTypes.HANDLE_CHANGE_DARK
    payload: boolean
}

interface FetchUsersErrorAction {
    type: UsersActionTypes.ADD_ERROR
    payload: any
}

interface IsLoading {
    type: UsersActionTypes.IS_LOADING
}

interface RedirectTo {
    type: UsersActionTypes.REDIRECT_TO
    payload: string
}

export type UserAction = FetchUsersErrorAction | IsDark | IsLoading | RedirectTo | HandleChangeDark
