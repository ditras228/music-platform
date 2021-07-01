import React, {useEffect} from 'react'
import {Grid, IconButton} from '@material-ui/core'
import {Pause, PlayArrow, VolumeUp} from '@material-ui/icons'
import TrackProgress from './TrackProgress'
import {useTypedSelector} from '../hooks/useTypedSelector'
import {useActions} from '../hooks/useAction'
import {baseURL} from '../api'
import classes from './Player.module.css'
import cookies from 'next-cookies'
import {savePlayer} from '../store/action-creators/player'
import {useDispatch} from 'react-redux'
import {NextThunkDispatch, wrapper} from '../store'
import {useRouter} from 'next/router'
import {ITrack} from '../types/track'

let audio


const Player = () => {
    const player = useTypedSelector(state => state.player)
    const {pause, volume, active, duration, currentTime} = player
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions()
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(savePlayer(player))
        console.log(player)
        }
    ,[pause, volume, active, duration, currentTime])

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            console.log('wtf ' +currentTime)
            setCurrentTime ( currentTime || 0)
            setAudio()
        } else {
            setAudio()
           // play()
        }
    }, [active])
    const setAudio = () => {
        if (active){
        audio.src = baseURL+active.audio
            console.log(audio)
        audio.volume = volume / 100
        audio.onloadedmetadata = () => {
            setDuration(Math.ceil(audio.duration))
        }
        audio.ontimeupdate = () => {
            setCurrentTime(Math.ceil(audio.currentTime))
        }
    }}
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
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }
    if(!active){
        return null
    }
    return (
        <div className={classes.player}>
            <IconButton onClick={play}>
                {pause
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <Grid container direction={'column'} style={{width: 200, margin: '0 20px'}}>
                <div>{active.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} format={'time'}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>
    )
}

export default Player
