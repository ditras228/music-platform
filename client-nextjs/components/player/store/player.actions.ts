import { Dispatch } from "react";
import { ITrack } from "../../../pages/tracks/store/track.types";
import { PlayerActions, PlayerActionTypes } from "./player.types";

export const playTrack = (): PlayerActions => {
  return { type: PlayerActionTypes.PLAY };
};

export const pauseTrack = (): PlayerActions => {
  return { type: PlayerActionTypes.PAUSE };
};

export const setDuration = (payload: number): PlayerActions => {
  return { type: PlayerActionTypes.SET_DURATION, payload };
};

export const setVolume = (payload: number): PlayerActions => {
  return { type: PlayerActionTypes.SET_VOLUME, payload };
};

export const setCurrentTime = (payload: number): PlayerActions => {
  return { type: PlayerActionTypes.SET_CURRENT_TIME, payload };
};

export const setActiveTrack = (payload: ITrack): PlayerActions => {
  return { type: PlayerActionTypes.SET_ACTIVE, payload };
};

export const setPlayer = (payload): PlayerActions => {
  return { type: PlayerActionTypes.SET_PLAYER, payload };
};
export const setCurrentAlbum = (payload): PlayerActions => {
  return { type: PlayerActionTypes.SET_CURRENT_ALBUM, payload };
};
export const setPreview = (active, track, pause) => {
  return async (dispatch: Dispatch<PlayerActions>) => {
    if (active?.id == track.id) {
      if (pause) {
        dispatch({
          type: PlayerActionTypes.PLAY,
        });
      } else {
        dispatch({
          type: PlayerActionTypes.PAUSE,
        });
      }
    } else {
      dispatch({
        type: PlayerActionTypes.SET_ACTIVE,
        payload: track,
      });
    }
  };
};
