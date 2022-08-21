import {PlayerActions, PlayerActionTypes, PlayerState} from '../../types/player'

const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    activeAlbum: null,
    pause: true,
    volume: 50

}

export const playerReducer = (state = initialState, action: PlayerActions) => {
    switch (action.type) {
        case PlayerActionTypes.PLAY:
            return {...state, pause: false}
        case PlayerActionTypes.PAUSE:
            return {...state, pause: true}
        case PlayerActionTypes.SET_DURATION:
            return {...state, duration: action.payload}
        case PlayerActionTypes.SET_ACTIVE:
            return {...state, duration: 0, currentTime: 0, active: action.payload, pause: false}
        case PlayerActionTypes.SET_ACTIVE__ALBUM:
            return {...state, duration: 0, currentTime: 0, activeAlbum: action.payload, pause: false, active: action.payload.tracks[0]}
        case PlayerActionTypes.SET_CURRENT_TIME:
            return {...state, currentTime: action.payload}
        case PlayerActionTypes.SET_VOLUME:
            return {...state, volume: action.payload}
        case PlayerActionTypes.SET_PLAYER:
            if (action.payload)
                return {
                    ...state,
                    currentTime: action.payload.currentTime,
                    duration: action.payload.duration,
                    active: action.payload.active,
                    pause: action.payload.pause,
                    volume: action.payload.volume
                }
            break
        default:
            return state;
    }


}
