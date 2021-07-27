import {Dispatch} from 'react'
import {UsersAPI} from '../../api/usersAPI'
import {UserAction, UsersActionTypes} from '../../types/user'
import {TracksAPI} from '../../api/tracksAPI'
import {AlbumsAPI} from '../../api/albumsAPI'

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
