import {IComment, ITrack} from './track'

export interface IAlbum{
    _id: string
    listens: number
    userId: string
    name: string
    text: string
    artist: string
    picture: string
    tracks: ITrack[]
    comments: IComment[]
}
export interface AlbumState{
    albums: IAlbum[]
    albumTracks: any
    error: string
}

export enum AlbumActionTypes{
    FETCH_ALBUMS='FETCH_ALBUMS',
    FETCH_ALBUMS_ERROR='FETCH_ALBUMS_ERROR',
    ADD_TRACK_TO_ALBUM='ADD_TRACK_TO_ALBUM',
    REMOVE_TRACK_FROM_ALBUM='REMOVE_TRACK_FROM_ALBUM',
    FETCH_CHECKED_STATUS='FETCH_CHECKED_STATUS',
    REMOVE_ALBUM='AlbumActionTypes'
}
interface RemoveAlbum{
    type: AlbumActionTypes.REMOVE_ALBUM
    payload: string
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
    payload: any
}
interface AddTrackToAlbum{
    type: AlbumActionTypes.ADD_TRACK_TO_ALBUM
    payload: any
}
export type AlbumAction =
    FetchAlbumsAction
    | FetchAlbumsErrorAction
    | AddTrackToAlbum
    | RemoveTrackFromAlbum
    |RemoveAlbum
