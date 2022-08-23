import {ITrack} from './track'
import {IAlbum} from "./album";

export interface PlaylistState {
    tracks: ITrack[]
    page: number
}

export enum PlaylistActionTypes {
    SET_PLAYLIST = 'SET_PLAYLIST',
    SET_PAGE = 'SET_PAGE',
}

interface PlaylistAction {
    type: PlaylistActionTypes.SET_PLAYLIST
    payload: any
}

interface SetPageAction {
    type: PlaylistActionTypes.SET_PAGE
    payload: number
}

export type PlaylistActions =
    | PlaylistAction |SetPageAction
