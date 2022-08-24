import { TrackAction, TrackActionTypes, TrackState } from "../../types/track";

const initialState: TrackState = {
  isFetching: false,
  current_page: 0,
  total: 0,
  tracks: [],
  error: "",
};

export const trackReducer = (
  state = initialState,
  action: TrackAction
): TrackState => {
  switch (action.type) {
    case TrackActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, error: action.payload };
    case TrackActionTypes.FETCH_TRACKS:
      return {
        ...state,
        error: "",
        tracks: [...state.tracks, ...action.payload.data],
        total: action.payload.total,
        current_page: action.payload.current_page,
      };
    case TrackActionTypes.SEARCH_TRACKS:
      return {
        ...state,
        error: "",
        tracks: action.payload.data,
        total: action.payload.total,
        current_page: action.payload.current_page,
      };
    case TrackActionTypes.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case TrackActionTypes.REMOVE_TRACK:
      return {
        ...state,
        error: "",
        tracks: [
          ...state.tracks.filter((track) => track.id !== action.payload),
        ],
      };
    default:
      return state;
  }
};
