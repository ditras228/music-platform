import {Dispatch} from 'react'
import {UsersAPI} from '../../api/usersAPI'
import {UserAction, UsersActionTypes} from '../../types/user'
import cookie from 'js-cookie'

export const LogOut = () => {
    return async () => {
        cookie.remove('token')
        cookie.remove('isAuth')
    }
}
export const Login = (username, password) => {
    return async (dispatch: Dispatch<UserAction>) => {
        await UsersAPI.login({username, password})
            .then(response => {
                if (response.data?.status === 500) {
                    dispatch({
                        type: UsersActionTypes.ADD_ERROR,
                        payload: {type: 'login', message: response.data?.message || 'Неизвестная ошибка'}
                    })
                }
                cookie.set('token', `${response.data.token}`, { expires: 1})
                cookie.set('isAuth', 'true', { expires: 1})

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
        const token=cookie.get('token')
        await UsersAPI.auth(token)
            .then(response => {
                if (response.data.status !== 500) {
                    if (response.data.user) {

                        cookie.set('token', `${response.data.token}`, { expires: 1})
                        cookie.set('isAuth', 'true', { expires: 1})

                        dispatch({
                            type: UsersActionTypes.LOGIN,
                            payload: response.data.user
                        })
                    }
                    } else {
                    cookie.remove('token')
                    cookie.remove('isAuth')
                }
                }
            ).catch(() =>
                console.log('error ' + token)
            )
    }
}
export const Registration = (username, password) => {
    return async (dispatch: Dispatch<UserAction>) => {
        await UsersAPI.registration({username, password}).then(response => {
            if (response.data.status === 500) {
                dispatch({
                    type: UsersActionTypes.ADD_ERROR,
                    payload: {type: 'register', message: response.data?.message || 'Неизвестная ошибка'}
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