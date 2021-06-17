import {Dispatch} from 'react'
import {UsersAPI} from '../../api/usersAPI'
import {UserAction, UsersActionTypes} from '../../types/user'

export const getUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await UsersAPI.getUsers()
            dispatch({type: UsersActionTypes.FETCH_USERS, payload: response.data || 'Неизвестная ошибка'})
        } catch (e) {

        }
    }
}
export const Login = (username, password) => {
    return async (dispatch: Dispatch<UserAction>) => {
        await UsersAPI.login({username, password})
            .then(response => {
                if (response.data.status === 500) {
                    dispatch({
                        type: UsersActionTypes.ADD_ERROR,
                        payload: {type: 'login', message: response.data.message || 'Неизвестная ошибка'}
                    })
                }
                localStorage.setItem('token', response.data.token)
                dispatch({
                    type: UsersActionTypes.LOGIN,
                    payload: response.data.user
                })
            })
            .catch(e => {
                dispatch({
                    type: UsersActionTypes.ADD_ERROR,
                    payload: {type: 'login', message: e.data.message || 'Неизвестная ошибка'}
                })
            })

    }
}
export const Auth = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        const token= localStorage.getItem('token')
        await UsersAPI.auth(token)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                dispatch({
                    type: UsersActionTypes.LOGIN,
                    payload: response.data.user
                })
            })

    }
}
export const Registration = (username, password) => {
    return async (dispatch: Dispatch<UserAction>) => {
        await UsersAPI.registration({username, password}).then(response => {
            if (response.data.status === 500) {
                dispatch({
                    type: UsersActionTypes.ADD_ERROR,
                    payload: {type: 'register', message: response.data.message || 'Неизвестная ошибка'}
                })
            }
        }).catch(e => {
            console.log(e)
            dispatch({
                type: UsersActionTypes.ADD_ERROR,
                payload: {type: 'register', message: e.data.message || 'Неизвестная ошибка'}
            })
        })

    }
}