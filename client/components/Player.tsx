import React, {useEffect} from 'react'
import {Grid, IconButton} from '@material-ui/core'
import {Pause, PlayArrow, VolumeUp} from '@material-ui/icons'
import TrackProgress from './TrackProgress'
import {useTypedSelector} from '../hooks/useTypedSelector'
import {useActions} from '../hooks/useAction'
import {baseURL} from '../api'
import {makeStyles} from '@material-ui/styles'
import cookieCutter from 'cookie-cutter'

let audio

const useStyles = makeStyles({
    player:{
    height: '60px',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    backgroundColor: 'lightgray'
}
});

const Player: React.FC = () => {
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration} = useActions()
    const classes= useStyles()


    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            setCurrentTime (cookieCutter.get('audio_currentTime' || 0))
        } else {
            setAudio()
            play()
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
            cookieCutter.set('audio_currentTime', audio.currentTime)
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
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>
    )
}

export default Player