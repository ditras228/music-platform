export interface IComment{
    _id: number
    username: string
    text: string
}
export interface ITrack{
    _id: number
    name: string
    artist: string
    text: string
    listens: number
    picture: string
    audio: string
    comments: IComment[]
}
export interface IAlbum{
    _id: number
    name: string
    artist: string
    text: string
    picture: string
    tracks: ITrack[]
}
export interface TrackState{
    tracks: ITrack[]
    albumTracks: ITrack[]
    error: string
}

export enum TrackActionTypes{
    FETCH_TRACKS='FETCH_TRACKS',
    FETCH_TRACKS_ERROR='FETCH_TRACKS_ERROR',
    ADD_TRACK_TO_ALBUM='ADD_TRACK_TO_ALBUM',
    ADD_TRACKS_TO_ALBUM='ADD_TRACKS_TO_ALBUM',
    REMOVE_TRACK_FROM_ALBUM='REMOVE_TRACK_FROM_ALBUM'
}
interface RemoveTrackFromAlbum{
    type: TrackActionTypes.REMOVE_TRACK_FROM_ALBUM
    payload: ITrack
}
interface AddTracksToAlbum{
    type: TrackActionTypes.ADD_TRACKS_TO_ALBUM
    payload: ITrack[]
}
interface AddTrackToAlbum{
    type: TrackActionTypes.ADD_TRACK_TO_ALBUM
    payload: ITrack
}
interface FetchTracksAction{
    type: TrackActionTypes.FETCH_TRACKS
    payload: ITrack[]
}
interface FetchTracksErrorAction{
    type: TrackActionTypes.FETCH_TRACKS_ERROR
    payload: string
}
export type TrackAction = FetchTracksAction | FetchTracksErrorAction | AddTrackToAlbum | AddTracksToAlbum