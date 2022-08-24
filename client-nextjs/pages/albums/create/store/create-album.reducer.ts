import {
  CreateAlbumAction,
  CreateAlbumActionTypes,
  CreateAlbumState,
} from "./create-album.types";

const initialState: CreateAlbumState = {
  albumTracks: [],
};

export const createAlbumReducer = (
  state = initialState,
  action: CreateAlbumAction
): CreateAlbumState => {
  switch (action.type) {
    case CreateAlbumActionTypes.ADD_TRACK_TO_ALBUM:
      return { ...state, albumTracks: [...state.albumTracks, action.payload] };
    case CreateAlbumActionTypes.REMOVE_TRACK_FROM_ALBUM:
      return {
        ...state,
        albumTracks: [
          ...state.albumTracks.filter((item) => item.id !== action.payload),
        ],
      };
    default:
      return state;
  }
};
