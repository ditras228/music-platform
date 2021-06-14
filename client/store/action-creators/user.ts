import {Dispatch} from 'react'
import {UsersAPI} from '../../api/usersAPI'
import {UserAction, UsersActionTypes} from '../../types/user'

export const getUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await UsersAPI.getUsers()
            dispatch({type: UsersActionTypes.FETCH_USERS, payload: response.data})
        } catch (e) {
            dispatch({
                type: UsersActionTypes.FETCH_USERS_ERROR,
                payload: 'Произошла ошибка загрузки трека'
            })
        }
    }
}

