import { TrackPageActionTypes } from "../../../tracks/[id]/store/track-page.types";

export enum AlbumPageActionTypes {
  SET_IS_FETCHING = "[AlbumPage] SET_IS_FETCHING",
  SET_ALBUM = "[AlbumPage] SET_ALBUM",
  SET_ALBUM_TRACKS = "[AlbumPage] SET_ALBUM_TRACKS",
  ADD_COMMENT = "[AlbumPage] ADD_COMMENT",
  SET_ERROR = "[AlbumPage] SET_ERROR",
  SET_ALBUM_COMMENTS = "[AlbumPage] SET_ALBUM_COMMENTS",
  SET_COMMENTS_FETCHING = "[AlbumPage] SET_COMMENTS_FETCHING",
}

interface SetAlbumFirstAction {
  type: AlbumPageActionTypes.SET_ALBUM;
  payload: any;
}

interface SetAlbumFirstAction {
  type: AlbumPageActionTypes.SET_ALBUM;
  payload: any;
}

interface SetAlbumTracksFirstAction {
  type: AlbumPageActionTypes.SET_ALBUM_TRACKS;
  payload: any;
}

interface SetIsFetchingAction {
  type: AlbumPageActionTypes.SET_IS_FETCHING;
  payload: boolean;
}

interface AddComment {
  type: AlbumPageActionTypes.ADD_COMMENT;
  payload: any;
}

interface SetError {
  type: AlbumPageActionTypes.SET_ERROR;
  payload: string;
}

interface SetAlbumComments {
  type: AlbumPageActionTypes.SET_ALBUM_COMMENTS;
  payload: any;
}
interface SetCommentsFetchingAction {
  type: AlbumPageActionTypes.SET_COMMENTS_FETCHING;
  payload: boolean;
}

export type AlbumPageAction =
  | SetAlbumFirstAction
  | SetIsFetchingAction
  | SetAlbumTracksFirstAction
  | AddComment
  | SetError
  | SetAlbumComments
  | SetCommentsFetchingAction;
