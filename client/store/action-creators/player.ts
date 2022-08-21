import {PlayerActions, PlayerActionTypes} from '../../types/player'
import {ITrack} from '../../types/track'
import cookie from 'js-cookie'

export const playTrack = (): PlayerActions => {
    return {type: PlayerActionTypes.PLAY}
}
export const pauseTrack = (): PlayerActions => {
    return {type: PlayerActionTypes.PAUSE}
}
export const setDuration = (payload: number): PlayerActions => {
    return {type: PlayerActionTypes.SET_DURATION, payload}
}
export const setVolume = (payload: number): PlayerActions => {
    return {type: PlayerActionTypes.SET_VOLUME, payload}
}
export const setCurrentTime = (payload: number): PlayerActions => {
    return {type: PlayerActionTypes.SET_CURRENT_TIME, payload}
}
export const setActiveTrack = (payload: ITrack): PlayerActions => {
    return {type: PlayerActionTypes.SET_ACTIVE, payload}
}
export const setPlayer = (payload): PlayerActions => {
    return {type: PlayerActionTypes.SET_PLAYER, payload}
}
export const savePlayer = (player) => {
    return async () => {
        cookie.set('player', `${JSON.stringify(player)}`)
    }
}
