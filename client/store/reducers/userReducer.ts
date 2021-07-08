import {UserAction, UsersActionTypes, UserState} from '../../types/user'

const initialState: UserState={
    errors: [],
}
export const usersReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UsersActionTypes.ADD_ERROR:
            return {...state, errors: [...state.errors, action.payload]}
        default:
            return state
    }
}
