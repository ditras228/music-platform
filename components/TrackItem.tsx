import React from 'react'
import {ITrack} from '../types/track'
import {Card, Grid, IconButton} from '@material-ui/core'
import {Delete, Pause, PlayArrow} from '@material-ui/icons'
import s from './TrackItem.module.css'
import {useRouter} from 'next/router'
import {useActions} from '../hooks/useAction'
import {baseURL} from '../api'

interface TrackItemProps {
    track: ITrack
    active?: boolean
}


const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    const {pauseTrack, playTrack, setActiveTrack}= useActions()
    const play=(e)=>{
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
    }
    const pause=(e)=>{
        e.stopPropagation()

        setActiveTrack(track)
        pauseTrack()
    }
    return (
        <Card className={s.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton >
                {active
                    ? <Pause onClick={play} />
                    : <PlayArrow onClick={pause}/>
                }
            </IconButton>
            <img width={70} height={70} src={baseURL+'/image'+track.picture}/>
            <Grid container direction={'column'} style={{width: 200, margin: '0 20px'}}>
                <div style={{fontSize: 12, color: 'gray'}}>{track.name}</div>
            </Grid>
            {active && <div>0:42 / 3:44</div>}
            <IconButton style={{marginLeft: 'auto'}} onClick={e => e.stopPropagation()}>
                <Delete/>
            </IconButton>

        </Card>
    )
}

export default TrackItem