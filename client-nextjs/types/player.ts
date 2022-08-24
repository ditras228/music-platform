import { ITrack } from "./track";
import { IAlbum } from "./album";

export interface PlayerState {
  active: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
  activeAlbum: IAlbum;
}

export enum PlayerActionTypes {
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  SET_ACTIVE = "SET_ACTIVE",
  SET_ACTIVE__ALBUM__FIRST = "SET_ACTIVE__ALBUM__FIRST",
  SET_ACTIVE__ALBUM = "SET_ACTIVE__ALBUM",
  SET_DURATION = "SET_DURATION",
  SET_CURRENT_TIME = "SET_CURRENT_TIME",
  SET_VOLUME = "SET_VOLUME",
  SET_PLAYER = "SET_PLAYER",
}

interface PlayerAction {
  type: PlayerActionTypes.SET_PLAYER;
  payload: any;
}

interface PlayAction {
  type: PlayerActionTypes.PLAY;
}

interface PauseAction {
  type: PlayerActionTypes.PAUSE;
}

interface SetActiveAction {
  type: PlayerActionTypes.SET_ACTIVE;
  payload: ITrack;
}

interface SetActiveAlbumFirstAction {
  type: PlayerActionTypes.SET_ACTIVE__ALBUM__FIRST;
  payload: any;
}

interface SetActiveAlbumAction {
  type: PlayerActionTypes.SET_ACTIVE__ALBUM;
  payload: any;
}

interface SetDurationAction {
  type: PlayerActionTypes.SET_DURATION;
  payload: number;
}

interface SetCurrentTimeAction {
  type: PlayerActionTypes.SET_CURRENT_TIME;
  payload: number;
}

interface SetVolumeAction {
  type: PlayerActionTypes.SET_VOLUME;
  payload: number;
}

export type PlayerActions =
  | PlayAction
  | PauseAction
  | SetActiveAction
  | SetDurationAction
  | SetCurrentTimeAction
  | SetVolumeAction
  | PlayerAction
  | SetActiveAlbumFirstAction
  | SetActiveAlbumAction;
