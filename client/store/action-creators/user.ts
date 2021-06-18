import {Dispatch} from 'react'
import {UsersAPI} from '../../api/usersAPI'
import {UserAction, UsersActionTypes} from '../../types/user'
import cookie from 'js-cookie'

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
                if (response.data?.status === 500) {
                    dispatch({
                        type: UsersActionTypes.ADD_ERROR,
                        payload: {type: 'login', message: response.data?.message || 'Неизвестная ошибка'}
                    })
                }
                cookie.set('token', `Bearer ${response.data.token}`)
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
            .finally(()=>{
                console.log('12312')
                console.log(cookie.get('token'))
            })

    }
}
export const Auth = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        const token= cookie.get('token')
        await UsersAPI.auth(token)
            .then(response => {
                cookie.set('token', `Bearer ${response.data.token}`)
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