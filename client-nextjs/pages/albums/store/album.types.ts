import { IComment, ITrack } from "../../tracks/store/track.types";
import { IComments } from "../../tracks/[id]/store/track-page.types";

export interface IAlbums {
  current_page: number;
  total: number;
  data: IAlbums[];
}
export interface IAlbum {
  id: number;
  listens: number;
  user_id: number;
  name: string;
  text: string;
  author: string;
  image: string;
  tracks: ITrackData;
  comments: IComments;
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
  albums: IAlbums;
  error: string;
  isFetching: boolean;
  current_page: number;
  total: number;
}

export enum AlbumActionTypes {
  FETCH_ALBUMS = "[Albums] FETCH_ALBUMS",
  FETCH_ALBUMS_ERROR = "[Albums] FETCH_ALBUMS_ERROR",
  ADD_TRACK_TO_ALBUM = "[Albums] ADD_TRACK_TO_ALBUM",
  REMOVE_TRACK_FROM_ALBUM = "[Albums] REMOVE_TRACK_FROM_ALBUM",
  REMOVE_ALBUM = "[Albums] REMOVE_ALBUM",
  SET_IS_FETCHING = "[Albums] SET_IS_FETCHING",
  SEARCH_ALBUMS = "[Albums] SEARCH_ALBUMS",
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
interface SearchAlbums {
  type: AlbumActionTypes.SEARCH_ALBUMS;
  payload: IAlbums;
}

export type AlbumAction =
  | FetchAlbumsAction
  | FetchAlbumsErrorAction
  | AddTrackToAlbum
  | RemoveTrackFromAlbum
  | RemoveAlbum
  | SetIsFetchingAction
  | SearchAlbums;
