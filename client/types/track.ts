export interface IComment {
    _id: number
    userId: string
    username: string
    text: string
}

export interface ITrack {
    _id: string
    name: string
    artist: string
    lyric: string
    listens: number
    image: string
    audio: string
    comments: IComment[]
    checked: boolean
    userId: string
}

export interface TrackState {
    tracks: ITrack[]
    error: string
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
    REMOVE_TRACK = 'REMOVE_TRACK',
}

interface RemoveTrack {
    type: TrackActionTypes.REMOVE_TRACK
    payload: string
}

interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS
    payload: ITrack[]
}

interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR
    payload: string
}

export type TrackAction = FetchTracksAction | FetchTracksErrorAction | RemoveTrack
