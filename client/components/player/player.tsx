import React, {useEffect} from 'react'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {useActions} from '../../hooks/useAction'
import {audioURL, imagesURL} from '../../api'
import classes from './player.module.scss'
import {playTrack, savePlayer} from '../../store/action-creators/player'
import {useDispatch} from 'react-redux'
import TrackVolume from "../track-volume/track-volume";
import TrackProgress from "../track-progress/track-progress";
import Play from "../play/play";

let audio

const Player = () => {
    const player = useTypedSelector(state => state.player)
    const {active,pause, volume, duration, currentTime} = player
    const {pauseTrack, setCurrentTime, setDuration} = useActions()
    const dispatch = useDispatch()

    useEffect(() => {
            active && dispatch(savePlayer({
                ...player,
                active: {id: active.id, name: active.name, artist: active.artist, audio: active.audio}
            }))
        }
        , [currentTime, volume])

    useEffect(() => {
        if(pause){
            audio?.pause()
        }
        const setAudio = () => {
            if (active) {
                audio.src = audioURL + active.id
                audio.volume = volume / 100
                audio.onloadedmetadata = () => {
                    setDuration(Math.ceil(audio.duration))
                    if(!pause)
                    audio.play()
                }
                audio.ontimeupdate = () => {
                    if (audio.duration >= audio.currentTime) {
                        setCurrentTime(Math.ceil(audio.currentTime))
                    } else {
                        if (audio.duration !== 0) {
                            pauseTrack()
                            audio.pause()
                        } else {
                            if (audio.src !== active?.audio) {
                                setDuration(Math.ceil(duration))
                            } else {
                                setDuration(Math.ceil(audio.duration))
                            }
                        }
                    }
                }
            }
        }
        console.log('pause')
        if (!audio) {
            audio = new Audio()
            !currentTime && setCurrentTime(currentTime)
            setAudio()
            // pauseTrack()
        } else {
            const src = audio.src.replace(imagesURL, '')
            if (src.split('/')[4] != active?.id) {
                setDuration(Math.ceil(audio.duration))
                setAudio()
                console.log(src.split('/')[4])
                console.log(active.id)
            }else{
                if(!pause){
                    audio.play()
                }

            }
        }
    }, [active, pause])


    if (!active) {
        return null
    }
    return (
        <div className={classes.player}>
            <div className={classes.player__column}>
                <Play audio={audio}/>
                <div className={classes.player__info}>
                    <div className={classes.player__info__name}>{active.name}</div>
                    <div className={classes.player__info__author}>{active.artist}</div>
                </div>
            </div>
            <TrackProgress audio={audio}/>
            <TrackVolume audio={audio}/>
        </div>
    )
}

export default Player
