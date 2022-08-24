import { AlbumActionTypes, IAlbum, ITrackData } from "../../../../types/album";
import { IComment } from "../../../../types/track";
import {
  AlbumPageAction,
  AlbumPageActionTypes,
} from "../../../../types/albumPage";

const initialState: IAlbum = {
  id: 0,
  listens: 0,
  user_id: 0,
  name: "",
  text: "",
  author: "",
  image: "",
  tracks: null as ITrackData,
  comments: [] as IComment[],
  isFetching: false,
};

export const albumPageReducer = (
  state = initialState,
  action: AlbumPageAction
): IAlbum => {
  switch (action.type) {
    case AlbumPageActionTypes.SET_ALBUM:
      return {
        ...state,
        ...action.payload,
      };
    case AlbumPageActionTypes.SET_ALBUM_TRACKS:
      return {
        ...state,
        tracks: {
          ...state.tracks,
          data: [...state.tracks.data, ...action.payload.tracks.data],
          current_page: action.payload.tracks.current_page,
        },
      };
    case AlbumPageActionTypes.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    default:
      return state;
  }
};