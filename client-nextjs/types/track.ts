export interface IComment {
  id: number;
  userId: string;
  name: string;
  text: string;
}
export interface ITracks {
  current_page: number;
  total: number;
  data: ITrack[];
}
export interface ITrack {
  id: number;
  name: string;
  artist: string;
  lyrics: string;
  listens: number;
  image: string;
  audio: string;
  comments: IComment[];
  checked: boolean;
  userId: string;
  page: number;
}

export interface TrackState {
  isFetching: boolean;
  current_page: number;
  total: number;
  tracks: ITrack[];
  error: string;
}

export enum TrackActionTypes {
  FETCH_TRACKS = "FETCH_TRACKS",
  SEARCH_TRACKS = "SEARCH_TRACKS",
  SET_IS_FETCHING = "SET_IS_FETCHING",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
  REMOVE_TRACK = "REMOVE_TRACK",
}

interface RemoveTrack {
  type: TrackActionTypes.REMOVE_TRACK;
  payload: number;
}

interface FetchTracksAction {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: ITracks;
}

interface SearchTracksAction {
  type: TrackActionTypes.SEARCH_TRACKS;
  payload: ITracks;
}

interface SetIsFetchingAction {
  type: TrackActionTypes.SET_IS_FETCHING;
  payload: boolean;
}

interface FetchTracksErrorAction {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

export type TrackAction =
  | FetchTracksAction
  | FetchTracksErrorAction
  | RemoveTrack
  | SetIsFetchingAction
  | SearchTracksAction;
