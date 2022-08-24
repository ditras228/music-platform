import {Dispatch} from 'react'
import {TracksAPI} from '../../api/tracksAPI'
import {PlaylistActions, PlaylistActionTypes} from "../../types/playlist";
import {PlayerActionTypes} from "../../types/player";

export const fetchPlaylist = (token, page) => {
    return async (dispatch: Dispatch<PlaylistActions>) => {

        await TracksAPI.getTracks(token, page)
            .then(res => {
                    dispatch({type: PlaylistActionTypes.SET_PLAYLIST, payload: res.data})
                }
            )
            .catch(e => {
                    console.log(e)
                }
            )
    }
}

export const fetchNextPlaylist = (token, page) => {
    return async (dispatch: Dispatch<any>) => {

        await TracksAPI.getTracks(token, page)
            .then(res => {
                    console.log(res.data)
                    dispatch({type: PlaylistActionTypes.SET_PLAYLIST, payload: res.data})
                    dispatch({type: PlayerActionTypes.SET_ACTIVE, payload: res.data.data[0]})
                }
            )
            .catch(e => {
                    console.log(e)
                }
            )
    }
}
