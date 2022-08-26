import {
  AlbumAction,
  AlbumActionTypes,
  AlbumState,
} from "../../../types/album";

const initialState: AlbumState = {
  albums: [],
  error: "",
  isFetching: false,
  current_page: 0,
  total: 0,
};

export const albumReducer = (
  state = initialState,
  action: AlbumAction
): AlbumState => {
  switch (action.type) {
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
    case AlbumActionTypes.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };

    default:
      return state;
  }
};