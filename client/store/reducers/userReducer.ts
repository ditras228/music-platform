import {UserAction, UsersActionTypes, UserState} from '../../types/user'

const initialState: UserState={
    errors: [],
    isDark: false
}
export const usersReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UsersActionTypes.ADD_ERROR:
            return {...state, errors: [...state.errors, action.payload]}
        case UsersActionTypes.IS_DARK:
            return {...state, isDark: !state.isDark}
        default:
            return state
    }
}
