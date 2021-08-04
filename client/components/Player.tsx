import React, {useEffect} from 'react'
import {Box, Grid, IconButton} from '@material-ui/core'
import {Pause, PlayArrow, VolumeUp} from '@material-ui/icons'
import TrackProgress from './TrackProgress'
import {useTypedSelector} from '../hooks/useTypedSelector'
import {useActions} from '../hooks/useAction'
import {baseURL} from '../api'
import classes from './Player.module.css'
import {savePlayer} from '../store/action-creators/player'
import {useDispatch} from 'react-redux'
import {TracksAPI} from '../api/tracksAPI'

let audio


const Player = () => {
    const player = useTypedSelector(state => state.player)
    const {pause, volume, active, duration, currentTime} = player
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions()
    const dispatch = useDispatch()


    useEffect(() => {
            dispatch(savePlayer(player))
            if (currentTime === duration) {
                TracksAPI.listen(active._id).then(active.listens += 1)
            }
        }
        , [pause, volume, currentTime])

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            !currentTime && setCurrentTime(currentTime)
            setAudio()
        } else {
            const src = audio.src.replace(baseURL, '')
            if (src !== active?.audio) {
                console.log('________________')
                console.log(src)
                console.log(active?.audio)
                setAudio()
            }
            audio.play()
        }
    }, [active])
    const setAudio = () => {
        if (active) {
            audio.src = baseURL + active.audio
            console.log(audio)
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
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
    const changeVolume = (e: any, newValue: number) => {
        audio.volume = newValue/ 100
        setVolume(newValue)
    }
    const changeCurrentTime = (e: any, newValue: number) => {
        audio.currentTime = newValue
        setCurrentTime(newValue)
    }
    if (!active) {
        return null
    }
    return (
            <Box className={classes.player} bgcolor={'background.default'}>
            <div className={classes.column}>
                <IconButton onClick={play}>
                    {pause
                        ? <Pause/>
                        : <PlayArrow/>
                    }
                </IconButton>
                <div className={classes.row}>
                    <div>{active.name}</div>
                    <div style={{fontSize: 12}}>{active.artist}</div>
                </div>
            </div>
            <TrackProgress left={currentTime} right={duration}
                           onChange={changeCurrentTime} format={'time'}/>
            <div className={classes.column}>
                <VolumeUp style={{marginLeft: 'auto', paddingRight: 10}}/>
                <TrackProgress left={volume} right={100} onChange={changeVolume}/>
            </div>
        </Box>
    )
}

export default Player
