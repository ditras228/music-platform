import { TrackPageActionTypes } from "./track-page.types";

export enum AlbumPageActionTypes {
  SET_IS_FETCHING = "SET_IS_FETCHING",
  SET_ALBUM = "SET_ALBUM",
  SET_ALBUM_TRACKS = "SET_ALBUM_TRACKS",
  ADD_COMMENT = "ADD_COMMENT",
  SET_ERROR = "SET_ERROR",
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
export type AlbumPageAction =
  | SetAlbumFirstAction
  | SetIsFetchingAction
  | SetAlbumTracksFirstAction
  | AddComment
  | SetError;
