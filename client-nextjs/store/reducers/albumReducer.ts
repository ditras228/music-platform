import { AlbumAction, AlbumActionTypes, AlbumState } from "../../types/album";

const initialState: AlbumState = {
  albums: [],
  albumTracks: [],
  error: "",
};
export const albumReducer = (
  state = initialState,
  action: AlbumAction
): AlbumState => {
  switch (action.type) {
    case AlbumActionTypes.ADD_TRACK_TO_ALBUM:
      return { ...state, albumTracks: [...state.albumTracks, action.payload] };
    case AlbumActionTypes.REMOVE_TRACK_FROM_ALBUM:
      return {
        ...state,
        albumTracks: [
          ...state.albumTracks.filter(
            (item) => item._id !== action.payload._id
          ),
        ],
      };
    case AlbumActionTypes.FETCH_ALBUMS_ERROR:
      return { ...state, error: action.payload };
    case AlbumActionTypes.FETCH_ALBUMS:
      return { ...state, error: "", albums: action.payload };
    case AlbumActionTypes.REMOVE_ALBUM:
      return {
        ...state,
        error: "",
        albums: [
          ...state.albums.filter((album) => album.id !== action.payload),
        ],
      };
    default:
      return state;
  }
};
