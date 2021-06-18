import {UserAction, UsersActionTypes, UserState} from '../../types/user'

const initialState: UserState={
    user:{} ,
    errors: [],
    isAuth: false
}
export const usersReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UsersActionTypes.ADD_ERROR:
            return {...state, errors: [...state.errors, action.payload]}
        case UsersActionTypes.LOGIN:
            const test = {...state, user: action.payload, isAuth: true}
            console.log('test'+state.isAuth)
            return test
        default:
            return state
    }
}
