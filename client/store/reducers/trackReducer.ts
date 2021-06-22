import {TrackAction, TrackActionTypes, TrackState} from '../../types/track'

const initialState: TrackState={
    tracks:[],
    albumTracks:[],
    error: ''
}
export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        case TrackActionTypes.FETCH_TRACKS:
            return {...state, error: '', tracks: action.payload}
        case TrackActionTypes.ADD_TRACK_TO_ALBUM:
            return {...state, albumTracks: [...state.albumTracks, action.payload]}
        default:
            return state
    }
}
