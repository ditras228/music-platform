import {Dispatch} from 'react'
import {TrackAction, TrackActionTypes} from '../../types/track'
import {TracksAPI} from '../../api/tracksAPI'

export const fetchTracks = (token) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await TracksAPI.getTracks(token)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка загрузки треков'
            })
        }
    }
}
export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await TracksAPI.searchTracks(query)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка загрузки треков'
            })
        }
    }
}