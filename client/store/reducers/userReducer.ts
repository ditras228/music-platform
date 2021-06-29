import {UserAction, UsersActionTypes, UserState} from '../../types/user'

const initialState: UserState={
    user:{} ,
    errors: [],
    isAuth: false,
    isLoading: true
}
export const usersReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UsersActionTypes.ADD_ERROR:
            return {...state, errors: [...state.errors, action.payload]}
        case UsersActionTypes.LOGIN:
            return  {...state, user: action.payload, isAuth: true}
        case UsersActionTypes.IS_LOADING:
            return  {...state, isLoading: action.payload}

        default:
            return state
    }
}
