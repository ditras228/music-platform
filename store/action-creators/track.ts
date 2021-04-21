import axios from 'axios'
import {Dispatch} from 'react'
import {TrackAction, TrackActionTypes} from '../../types/track'
import {TracksAPI} from '../../api/tracksAPI'

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await TracksAPI.getTracks()
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка загрузки трека'
            })
        }
    }
}