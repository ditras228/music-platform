export enum TrackPageActionTypes {
  FETCH_TRACK = "[TrackPage] SET_TRACK",
  SET_ERROR = "[TrackPage] SET_ERROR",
  ADD_COMMENT = "[TrackPage] ADD_COMMENT",
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

export type TrackPageActions = SetTrack | SetError | AddComment;
