import {ITrack} from './track'

export interface IAlbum{
    _id: number
    name: string
    artist: string
    picture: string
    tracks: ITrack[]
}
export interface AlbumState{
    albums: IAlbum[]
    albumTracks: ITrack[]
    error: string
}

export enum AlbumActionTypes{
    FETCH_ALBUMS='FETCH_ALBUMS',
    FETCH_ALBUMS_ERROR='FETCH_ALBUMS_ERROR',
    ADD_TRACK_TO_ALBUM='ADD_TRACK_TO_ALBUM',
    ADD_TRACKS_TO_ALBUM='ADD_TRACKS_TO_ALBUM',
    REMOVE_TRACK_FROM_ALBUM='REMOVE_TRACK_FROM_ALBUM'
}
interface FetchAlbumsAction{
    type: AlbumActionTypes.FETCH_ALBUMS
    payload: IAlbum[]
}
interface FetchAlbumsErrorAction{
    type: AlbumActionTypes.FETCH_ALBUMS_ERROR
    payload: string
}
interface RemoveTrackFromAlbum{
    type: AlbumActionTypes.REMOVE_TRACK_FROM_ALBUM
    payload: ITrack
}
interface AddTracksToAlbum{
    type: AlbumActionTypes.ADD_TRACKS_TO_ALBUM
    payload: ITrack[]
}
interface AddTrackToAlbum{
    type: AlbumActionTypes.ADD_TRACK_TO_ALBUM
    payload: ITrack
}

export type AlbumAction =
    FetchAlbumsAction
    | FetchAlbumsErrorAction
    | AddTrackToAlbum
    | AddTracksToAlbum
    | RemoveTrackFromAlbum