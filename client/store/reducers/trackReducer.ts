import {TrackAction, TrackActionTypes, TrackState} from '../../types/track'

const initialState: TrackState = {
    tracks: [],
    error: ''
}
export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        case TrackActionTypes.FETCH_TRACKS:
            return {...state, error: '', tracks: action.payload}
        case TrackActionTypes.REMOVE_TRACK:
            return {...state, error: '', tracks: [...state.tracks.filter(track => track._id !== action.payload)]}
        default:
            return state
    }
}
