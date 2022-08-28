import { IComment } from "../../store/track.types";

export interface ITrackPage {
  id: number;
  name: string;
  artist: string;
  lyrics: string;
  listens: number;
  image: string;
  audio: string;
  comments: IComments;
  userId: number;
  page: number;
  pivot: any;
  error: any;
  isFetching: boolean;
}

export interface IComments {
  current_page: number;
  data: IComment[];
  last_page: number;
  total: number;
}

export enum TrackPageActionTypes {
  FETCH_TRACK = "[TrackPage] SET_TRACK",
  SET_ERROR = "[TrackPage] SET_ERROR",
  ADD_COMMENT = "[TrackPage] ADD_COMMENT",
  SET_FETCHING = "[TrackPage] SET_FETCHING",
  SET_TRACK_COMMENTS = "[TrackPage] SET_TRACK_COMMENTS",
}

interface SetTrack {
  type: TrackPageActionTypes.FETCH_TRACK;
  payload: any;
}

interface SetError {
  type: TrackPageActionTypes.SET_ERROR;
  payload: string;
}

interface AddComment {
  type: TrackPageActionTypes.ADD_COMMENT;
  payload: any;
}

interface SetFetching {
  type: TrackPageActionTypes.SET_FETCHING;
  payload: boolean;
}

interface SetTrackComments {
  type: TrackPageActionTypes.SET_TRACK_COMMENTS;
  payload: any;
}

export type TrackPageActions =
  | SetTrack
  | SetError
  | AddComment
  | SetFetching
  | SetTrackComments;
