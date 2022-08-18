import React, {useEffect} from 'react'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {useActions} from '../../hooks/useAction'
import {baseURL, filesURL} from '../../api'
import classes from './player.module.scss'
import {savePlayer} from '../../store/action-creators/player'
import {useDispatch} from 'react-redux'
import {TracksAPI} from '../../api/tracksAPI'
import Slider from "../track-progres/track-progres";

let audio

const Player = () => {
    const player = useTypedSelector(state => state.player)
    const {pause, volume, active, duration, currentTime} = player
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions()
    const dispatch = useDispatch()

    useEffect(() => {
            active && dispatch(savePlayer({
                ...player,
                active: {id: active.id, name: active.name, artist: active.artist, audio: active.audio}
            }))
            if (duration === 0) {
                setDuration(Math.ceil(audio?.duration))
            }
        }
        , [active, volume, duration, pause])

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            !currentTime && setCurrentTime(currentTime)
            setAudio()
            pauseTrack()
        } else {
            const src = audio.src.replace(filesURL, '')
            if (src !== active?.audio) {
                setDuration(Math.ceil(audio.duration))
                setAudio()
            }
        }
    }, [active])
    const setAudio = () => {
        if (active) {
            audio.src = filesURL + active.audio
            audio.volume = volume / 100
            // audio.currentTime=currentTime || 0
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                if (audio.duration - 1 >= audio.currentTime) {
                    setCurrentTime(Math.ceil(audio.currentTime))
                } else {
                    if (audio.duration !== 0) {
                        pauseTrack()
                        audio.pause()
                        TracksAPI.listen(active.id).then(() => active.listens += 1)
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
    const play = () => {
        playTrack()
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>, newValue: number) => {
        audio.volume = newValue / 100
        setVolume(newValue)
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>, newValue: number) => {
        audio.currentTime = newValue
        setCurrentTime(newValue)
    }
    if (!active) {
        return null
    }
    return (
        <div className={classes.player}>
            <div className={classes.player__column}>
                <div onClick={play}>
                    {pause
                        ? <div className={classes.player__play}></div>
                        : <div className={classes.player__pause}></div>
                    }
                </div>
                <div className={classes.player__info}>
                    <div className={classes.player__info__name}>{active.name}</div>
                    <div className={classes.player__info__author}>{active.artist}</div>
                </div>
            </div>
            <Slider left={currentTime} right={duration}
                    onChange={changeCurrentTime} format={'time'}/>
            <Slider left={volume} right={100} onChange={changeVolume}/>
        </div>
    )
}

export default Player
