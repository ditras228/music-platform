import { TrackPageActions, TrackPageActionTypes } from "./track-page.types";

const initialState = {
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
        comments: [, action.payload, ...state.comments],
      };
    default:
      return state;
  }
};
