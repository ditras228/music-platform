import React, {useEffect} from 'react'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {useActions} from '../../hooks/useAction'
import {audioURL} from '../../api'
import classes from './player.module.scss'
import TrackVolume from "../track-volume/track-volume";
import TrackProgress from "../track-progress/track-progress";
import Play from "../play/play";
import cookie from 'js-cookie'
import {setActiveTrack} from "../../store/action-creators/player";
import {ITrack} from "../../types/track";

let audio

const Player = () => {
    const player = useTypedSelector(state => state.player)
    const track = useTypedSelector(state => state.track)
    const {active, pause, volume, currentTime, activeAlbum} = player
    const {setCurrentTime, setDuration, setActiveTrack} = useActions()

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

                // Если аудио закончило проигрывание..
                audio.onended = () => {
                    if (track) {
                        nextTrack(track.tracks)
                    }
                    if (activeAlbum) {
                        nextTrack(activeAlbum.tracks)
                    }
                }

            }

        }, [active?.id, pause]
    )

    function nextTrack(tracks: ITrack[]): void {
        if (tracks.length > 0) {
            const currentIndex = tracks.indexOf(tracks.filter(value => value.id == active.id)[0])

            if (tracks.length - 1 > currentIndex) {
                setActiveTrack(tracks[currentIndex + 1])
            } else {
                setActiveTrack(null)
            }
        }

    }

    useEffect(() => {
        // Синхронизация redux и audio
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