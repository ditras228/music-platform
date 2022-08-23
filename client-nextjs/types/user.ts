export interface UserState {
    errors: Array<any>
    isLoading: boolean
    redirectTo: string
}

export enum UsersActionTypes {
    ADD_ERROR = 'ADD_ERROR',
    IS_LOADING = 'IS_LOADING',
    REDIRECT_TO = 'REDIRECT_TO'
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

export type UserAction = FetchUsersErrorAction  | IsLoading | RedirectTo
