import {Dispatch} from 'react'
import {TrackAction, TrackActionTypes} from '../../types/track'
import {TracksAPI} from '../../api/tracksAPI'

export const fetchTracks = (token) => {
    return async (dispatch: Dispatch<TrackAction>) => {

            await TracksAPI.getTracks(token)
                .then(res=>{
                    dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: res.data})
                }

            )
                .catch(e=>{

                        dispatch({
                            type: TrackActionTypes.FETCH_TRACKS_ERROR,
                            payload: 'Произошла ошибка загрузки треков'
                        })

                }

                )
    }
}
export const fetchAlbums = (token) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await TracksAPI.getTracks(token)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка загрузки альбомов'
            })
        }
    }
}
export const searchAlbums= (query: string, token: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await TracksAPI.searchAlbums(query, token)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка поиска альбомов'
            })
        }
    }
}
export const searchTracks = (query: string, token: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await TracksAPI.searchTracks(query,token)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка поиска треков'
            })
        }
    }
}