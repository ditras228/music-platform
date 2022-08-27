import {
  PlaylistActions,
  PlaylistActionTypes,
  PlaylistState,
} from "./playlist.types";

const initialState: PlaylistState = {
  tracks: [],
  page: 0,
  total: 0,
};

export const playlistReducer = (
  state = initialState,
  action: PlaylistActions
) => {
  switch (action.type) {
    case PlaylistActionTypes.SET_PLAYLIST:
      return {
        ...state,
        tracks: action.payload.data,
        page: action.payload.current_page,
        total: action.payload.last_page,
      };
    case PlaylistActionTypes.SET_PAGE:
      return { ...state, page: action.payload };
    case PlaylistActionTypes.SET_TOTAL:
      return { ...state, total: action.payload };
    default:
      return state;
  }
};
