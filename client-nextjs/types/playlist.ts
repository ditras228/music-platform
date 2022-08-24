import { ITrack } from "./track";

export interface PlaylistState {
  tracks: ITrack[];
  page: number;
  total: number;
}

export enum PlaylistActionTypes {
  SET_PLAYLIST = "SET_PLAYLIST",
  SET_PAGE = "SET_PAGE",
  SET_TOTAL = "SET_TOTAL",
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
