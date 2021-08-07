import {AlbumAction, AlbumActionTypes, AlbumState} from '../../types/album'
import {TrackActionTypes} from '../../types/track'

const initialState: AlbumState={
    albums:[],
    albumTracks:[],
    error: ''
}
export const albumReducer = (state = initialState, action: AlbumAction): AlbumState => {
    console.log(state.albumTracks)
    console.log(action.payload)
    switch (action.type) {
        case AlbumActionTypes.ADD_TRACK_TO_ALBUM:
            return {...state, albumTracks: [...state.albumTracks, action.payload]}
        case AlbumActionTypes.REMOVE_TRACK_FROM_ALBUM:
            return {...state, albumTracks: [...state.albumTracks.filter(item=>item._id!== action.payload._id)]}
        case AlbumActionTypes.FETCH_ALBUMS_ERROR:
            return {...state, error: action.payload}
        case AlbumActionTypes.FETCH_ALBUMS:
            return {...state, error: '', albums: action.payload}
        case AlbumActionTypes.REMOVE_ALBUM:
            return {...state, error: '', albums: state.albums.filter(album=> album._id!==action.payload)}
        default:
            return state
    }
}
