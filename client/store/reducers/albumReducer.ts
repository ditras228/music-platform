import {AlbumAction, AlbumActionTypes, AlbumState} from '../../types/album'

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
        default:
            return state
    }
}
