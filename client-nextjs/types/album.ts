import { IComment, ITrack } from "./track";

export interface IAlbum {
  id: number;
  listens: number;
  user_id: number;
  name: string;
  text: string;
  author: string;
  image: string;
  tracks: ITrackData;
  comments: IComment[];
  isFetching: boolean;
}

export interface ITrackData {
  current_page: number;
  data: ITrack[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface AlbumState {
  albums: IAlbum[];
  error: string;
  isFetching: boolean;
  current_page: 0;
  currentAlbum: number;
  total: 0;
}

export enum AlbumActionTypes {
  FETCH_ALBUMS = "FETCH_ALBUMS",
  FETCH_ALBUMS_ERROR = "FETCH_ALBUMS_ERROR",
  ADD_TRACK_TO_ALBUM = "ADD_TRACK_TO_ALBUM",
  REMOVE_TRACK_FROM_ALBUM = "REMOVE_TRACK_FROM_ALBUM",
  REMOVE_ALBUM = "REMOVE_ALBUM",
  SET_IS_FETCHING = "SET_IS_FETCHING",
  SET_CURRENT_ALBUM = "SET_CURRENT_ALBUM",
}

interface RemoveAlbum {
  type: AlbumActionTypes.REMOVE_ALBUM;
  payload: number;
}

interface FetchAlbumsAction {
  type: AlbumActionTypes.FETCH_ALBUMS;
  payload: IAlbum[];
}

interface FetchAlbumsErrorAction {
  type: AlbumActionTypes.FETCH_ALBUMS_ERROR;
  payload: string;
}

interface RemoveTrackFromAlbum {
  type: AlbumActionTypes.REMOVE_TRACK_FROM_ALBUM;
  payload: any;
}

interface AddTrackToAlbum {
  type: AlbumActionTypes.ADD_TRACK_TO_ALBUM;
  payload: ITrack;
}

interface SetIsFetchingAction {
  type: AlbumActionTypes.SET_IS_FETCHING;
  payload: boolean;
}
interface SetCurrentAlbumAction {
  type: AlbumActionTypes.SET_CURRENT_ALBUM;
  payload: number;
}

export type AlbumAction =
  | FetchAlbumsAction
  | FetchAlbumsErrorAction
  | AddTrackToAlbum
  | RemoveTrackFromAlbum
  | RemoveAlbum
  | SetIsFetchingAction
  | SetCurrentAlbumAction;
