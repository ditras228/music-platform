import React, {useEffect} from 'react'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {useActions} from '../../hooks/useAction'
import {audioURL} from '../../api'
import classes from './player.module.scss'
import TrackVolume from "../track-volume/track-volume";
import TrackProgress from "../track-progress/track-progress";
import Play from "../play/play";
import cookie from 'js-cookie'

let audio

const Player = () => {
    const player = useTypedSelector(state => state.player)
    const {active, pause, volume, currentTime} = player
    const {setCurrentTime, setDuration} = useActions()

    useEffect(() => {
        if (!audio) {
            // В случае отстуствия аудио, создаем его
            audio = new Audio()
        }

        if (active) {
            // В случае, если id'шник другой, обнуляем currentTime и присваеваем новый src
            if (audio.src.split('/')[4] != active?.id) {
                audio.src = audioURL + active.id
                setCurrentTime(0)
                audio.play()
            }
            audio.volume = volume / 100

            // По загрузке аудио
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }

            // При воспроизведении аудио
            audio.ontimeupdate = () => {
                if (audio.duration >= audio.currentTime) {
                    setCurrentTime(Math.ceil(audio.currentTime))
                }
            }
        }

    }, [active?.id, pause])

    // Синхронизация redux и audio
    useEffect(() => {
        if (pause) {
            audio.pause()
        } else {
            audio.play()
        }
    }, [pause])


    useEffect(() => {
        //Сохраняем в куки плеер
        active && cookie.set('player', `${JSON.stringify({
            ...player,
            active: {
                id: active.id,
                name: active.name,
                artist: active.artist,
                audio: active.audio,
            }
        })}`)

    }, [currentTime, pause, volume])

    // В случае отстуствия трека, возвращаем нуль
    if (active === null) return null


    // Удаление куков паузы текущего трека, при закрытии вкладки
    if (typeof window !== 'undefined') {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            cookie.set('player', `${JSON.stringify({...player, pause: true})}`)
        });
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
