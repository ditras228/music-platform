import { PlayerActions, PlayerActionTypes, PlayerState } from "./player.types";

const initialState: PlayerState = {
  currentTime: 0,
  duration: 0,
  active: null,
  pause: true,
  volume: 50,
  page: 0,
  albumId: 0,
};

export const playerReducer = (state = initialState, action: PlayerActions) => {
  switch (action.type) {
    case PlayerActionTypes.PLAY:
      return { ...state, pause: false };
    case PlayerActionTypes.PAUSE:
      return { ...state, pause: true };
    case PlayerActionTypes.SET_DURATION:
      return { ...state, duration: action.payload };
    case PlayerActionTypes.SET_ACTIVE:
      return {
        ...state,
        duration: 0,
        currentTime: 0,
        active: action.payload,
        pause: false,
      };
    case PlayerActionTypes.SET_ACTIVE__ALBUM:
      return {
        ...state,
        duration: 0,
        currentTime: 0,
        activeAlbum: action.payload,
        pause: false,
      };
    case PlayerActionTypes.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case PlayerActionTypes.SET_VOLUME:
      return { ...state, volume: action.payload };
    case PlayerActionTypes.SET_PLAYER:
      if (action.payload)
        return {
          ...state,
          currentTime: action.payload.currentTime,
          duration: action.payload.duration,
          active: action.payload.active,
          pause: action.payload.pause,
          volume: action.payload.volume,
          page: action.payload.page,
        };
      break;
    case PlayerActionTypes.SET_CURRENT_ALBUM:
      return {
        ...state,
        albumId: action.payload,
      };
    default:
      return state;
  }
};
