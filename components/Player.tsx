import React from 'react'
import {Card, Grid, IconButton} from '@material-ui/core'
import {Pause, PlayArrow, VolumeUp} from '@material-ui/icons'
import s from '../styles/Player.module.css'
import TrackProgress from './TrackProgress'
const Player: React.FC = () => {
    const active=false
    const track=         {_id: 1, artist: 'a1', audio: '', comments: [], listens: 5, name: 'name 1', picture: '', text: 'text'}

    return (
        <div className={s.player}>
            <IconButton onClick={e=>e.stopPropagation()}>
                {active
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <Grid container direction={'column'} style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            <TrackProgress left={0} right={100} onChange={()=>{}}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={0} right={100} onChange={()=>{}}/>
            </div>
    )
}

export default Player