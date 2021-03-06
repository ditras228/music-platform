import {Dispatch} from 'react'
import {UsersAPI} from '../../api/usersAPI'
import {UserAction, UsersActionTypes} from '../../types/user'
import {TracksAPI} from '../../api/tracksAPI'
import {AlbumsAPI} from '../../api/albumsAPI'
import cookie from 'js-cookie'

export const Registration = (name, email, password) => {
    return async (dispatch: Dispatch<UserAction>) => {
        await UsersAPI.registration({name, email, password}).then(response => {
            console.log(response)
            if (response.data.status === 500) {
                dispatch({
                    type: UsersActionTypes.ADD_ERROR,
                    payload: {type: 'register', message: response.data?.message || 'Неизвестная ошибка'}
                })

            }else{
                dispatch({
                    type: UsersActionTypes.REDIRECT_TO,
                    payload: '/auth/regsuccess'
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
export const CreateTrack = (values, token) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
                type: UsersActionTypes.IS_LOADING,
            }
        )
        await TracksAPI.createTrack(values, token)
            .then(res => {
                dispatch({
                        type: UsersActionTypes.REDIRECT_TO,
                        payload: res.data._id
                    }
                )
            })

    }
}
export const ChangeTheme = (theme: boolean) => {
    return async (dispatch: Dispatch<UserAction>) => {
         dispatch( {
             type: UsersActionTypes.HANDLE_CHANGE_DARK,
             payload: theme
         })
        cookie.set('theme', theme)
    }
}

export const CreateAlbum = (values, token) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
                type: UsersActionTypes.IS_LOADING,
            }
        )
        await AlbumsAPI.createAlbum(values, token)
            .then(res => {
                dispatch({
                        type: UsersActionTypes.REDIRECT_TO,
                        payload: res.data._id
                    }
                )
            })

    }
}
