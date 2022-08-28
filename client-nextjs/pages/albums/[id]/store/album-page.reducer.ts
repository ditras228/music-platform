import { AlbumPageAction, AlbumPageActionTypes } from "./album-page.types";
import { IAlbum, ITrackData } from "../../store/album.types";
import { TrackPageActionTypes } from "../../../tracks/[id]/store/track-page.types";

const initialState: IAlbum = {
  id: 0,
  listens: 0,
  user_id: 0,
  name: "",
  text: "",
  author: "",
  image: "",
  tracks: null as ITrackData,
  comments: null,
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
    case AlbumPageActionTypes.ADD_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          data: [action.payload, ...state.comments.data],
          total: state.comments.total + 1,
        },
      };
    case AlbumPageActionTypes.SET_ALBUM_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          data: [...state.comments.data, ...action.payload.comments.data],
          current_page: action.payload.comments.current_page,
        },
      };
    case AlbumPageActionTypes.SET_COMMENTS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    default:
      return state;
  }
};
