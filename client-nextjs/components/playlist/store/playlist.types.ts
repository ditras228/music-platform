import { ITrack } from "../../../pages/tracks/store/track.types";

export interface PlaylistState {
  tracks: ITrack[];
  page: number;
  total: number;
}

export enum PlaylistActionTypes {
  SET_PLAYLIST = "[Playlist] SET_PLAYLIST",
  SET_PAGE = "[Playlist] SET_PAGE",
  SET_TOTAL = "[Playlist] SET_TOTAL",
}

interface PlaylistAction {
  type: PlaylistActionTypes.SET_PLAYLIST;
  payload: any;
}

interface SetPageAction {
  type: PlaylistActionTypes.SET_PAGE;
  payload: number;
}

interface SetTotalPageAction {
  type: PlaylistActionTypes.SET_TOTAL;
  payload: number;
}

export type PlaylistActions =
  | PlaylistAction
  | SetPageAction
  | SetTotalPageAction;
