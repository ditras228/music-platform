import { ITrack } from "../../../pages/tracks/store/track.types";

export interface PlayerState {
  active: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
  page: number;
  albumId: number;
}

export enum PlayerActionTypes {
  PLAY = "[Player] PLAY",
  PAUSE = "[Player] PAUSE",
  SET_ACTIVE = "[Player] SET_ACTIVE",
  SET_ACTIVE__ALBUM = "[Player] SET_ACTIVE__ALBUM",
  SET_DURATION = "[Player] SET_DURATION",
  SET_CURRENT_TIME = "[Player] SET_CURRENT_TIME",
  SET_VOLUME = "[Player] SET_VOLUME",
  SET_PLAYER = "[Player] SET_PLAYER",
  SET_CURRENT_ALBUM = "[Player] SET_CURRENT_ALBUM",
}
interface SetCurrentAlbumAction {
  type: PlayerActionTypes.SET_CURRENT_ALBUM;
  payload: number;
}

interface PlayerAction {
  type: PlayerActionTypes.SET_PLAYER;
  payload: PlayerState;
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
  | SetActiveAlbumAction
  | SetCurrentAlbumAction;
