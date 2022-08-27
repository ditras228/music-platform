export interface IComment {
  id: number;
  userId: number;
  name: string;
  text: string;
  image: string;
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
  userId: number;
  page: number;
  pivot: ITrackPivot;
  error: string;
}
export interface ITrackPivot {
  album_id: number;
  track_id: number;
}
export interface TrackState {
  isFetching: boolean;
  current_page: number;
  total: number;
  tracks: ITrack[];
  error: string;
}

export enum TrackActionTypes {
  FETCH_TRACKS = "[Tracks] FETCH_TRACKS",
  SEARCH_TRACKS = "[Tracks] SEARCH_TRACKS",
  SET_IS_FETCHING = "[Tracks] SET_IS_FETCHING",
  FETCH_TRACKS_ERROR = "[Tracks] FETCH_TRACKS_ERROR",
  REMOVE_TRACK = "[Tracks] REMOVE_TRACK",
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
