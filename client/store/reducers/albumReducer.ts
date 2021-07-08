import {AlbumAction, AlbumActionTypes, AlbumState} from '../../types/album'

const initialState: AlbumState={
    albums:[],
    albumTracks:[],
    error: ''
}
export const albumReducer = (state = initialState, action: AlbumAction): AlbumState => {
    switch (action.type) {
        case AlbumActionTypes.ADD_TRACK_TO_ALBUM:
            return {...state, albumTracks: [...state.albumTracks, action.payload]}
        case AlbumActionTypes.ADD_TRACKS_TO_ALBUM:
            return {...state, albumTracks: action.payload}

        default:
            return state
    }
}
