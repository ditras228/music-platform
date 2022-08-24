import {
  PlaylistActions,
  PlaylistActionTypes,
  PlaylistState,
} from "../../types/playlist";

const initialState: PlaylistState = {
  tracks: [],
  page: 0,
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
      };
    case PlaylistActionTypes.SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
