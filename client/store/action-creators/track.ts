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
export const deleteTrack = (id:string, token: string) => {
    return async (dispatch: any) => {
        try {
            const response = await TracksAPI.deleteOne(id,token)
            if(response.data.track){
                dispatch({
                    type: TrackActionTypes.REMOVE_TRACK,
                    payload: response.data.track
                })
            }
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка удаления трека'
            })
        }
    }
}