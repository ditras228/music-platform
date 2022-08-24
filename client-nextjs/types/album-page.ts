export enum AlbumPageActionTypes {
  SET_IS_FETCHING = "SET_IS_FETCHING",
  SET_ALBUM = "SET_ALBUM",
  SET_ALBUM_TRACKS = "SET_ALBUM_TRACKS",
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

export type AlbumPageAction =
  | SetAlbumFirstAction
  | SetIsFetchingAction
  | SetAlbumTracksFirstAction;
