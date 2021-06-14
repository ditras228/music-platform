import {UserAction, UsersActionTypes, UserState} from '../../types/user'
const initialState: UserState={
    users:[],
    error: '',
    isAuth: true
}
export const usersReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UsersActionTypes.FETCH_USERS_ERROR:
            return {...state, error: action.payload}
        case UsersActionTypes.FETCH_USERS:
            return {error: '', users: action.payload}
        case UsersActionTypes.LOGIN:
            const test = {...state, isAuth: true}
            console.log('test'+state.isAuth)
            return test
        default:
            return state
    }
}
