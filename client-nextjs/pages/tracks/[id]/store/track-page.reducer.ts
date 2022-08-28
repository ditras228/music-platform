import {
  ITrackPage,
  TrackPageActions,
  TrackPageActionTypes,
} from "./track-page.types";

const initialState: ITrackPage = {
  id: 0,
  name: "",
  artist: "",
  lyrics: "",
  listens: 0,
  image: "",
  audio: "",
  comments: null,
  userId: 0,
  page: 0,
  pivot: null,
  error: null,
  isFetching: false,
};

export const trackPageReducer = (
  state = initialState,
  action: TrackPageActions
): any => {
  switch (action.type) {
    case TrackPageActionTypes.FETCH_TRACK:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        artist: action.payload.artist,
        lyrics: action.payload.lyrics,
        listens: action.payload.listens,
        image: action.payload.image,
        audio: action.payload.audio,
        comments: action.payload.comments,
        user_id: action.payload.user_id,
        pivot: action.payload.pivot || null,
      };
    case TrackPageActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TrackPageActionTypes.ADD_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          data: [action.payload, ...state.comments.data],
          total: state.comments.total + 1,
        },
      };
    case TrackPageActionTypes.SET_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case TrackPageActionTypes.SET_TRACK_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          data: [...state.comments.data, ...action.payload.comments.data],
          current_page: action.payload.comments.current_page,
        },
      };
    default:
      return state;
  }
};
