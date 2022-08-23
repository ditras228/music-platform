import {Dispatch} from 'react'
import {TrackAction, TrackActionTypes} from '../../types/track'
import {TracksAPI} from '../../api/tracksAPI'

export const fetchTracks = (token, page) => {
    return async (dispatch: Dispatch<TrackAction>) => {

        await TracksAPI.getTracks(token, page)
            .then(res => {
                    dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: res.data})
                    dispatch({type: TrackActionTypes.SET_IS_FETCHING, payload: false})
                }
            )
            .catch(e => {
                    console.log('ОШИБКА')
                    console.log(e)
                    dispatch({
                        type: TrackActionTypes.FETCH_TRACKS_ERROR,
                        payload: 'Произошла ошибка загрузки треков'
                    })

                }
            )
    }
}
export const searchTracks = (query: string, token: string, page: number) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            await TracksAPI.searchTracks(query, token, page)    .then(res => {
                    dispatch({type: TrackActionTypes.SEARCH_TRACKS, payload: res.data})
                }
            )
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка поиска треков'
            })
        }
    }
}
export const deleteTrack = (id: string, token: string) => {
    return async (dispatch: any) => {
        try {
            TracksAPI.deleteOne(id, token)
                .then(response => {
                        dispatch({
                            type: TrackActionTypes.REMOVE_TRACK,
                            payload: response.data
                        })
                    }
                )

        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка удаления трека'
            })
        }
    }
}
