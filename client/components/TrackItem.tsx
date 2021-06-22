import React from 'react'
import {ITrack} from '../types/track'
import {Card, Grid, IconButton} from '@material-ui/core'
import {Delete, Pause, PlayArrow, Timer} from '@material-ui/icons'
import {useRouter} from 'next/router'
import {useActions} from '../hooks/useAction'
import {baseURL} from '../api'
import {makeStyles} from '@material-ui/styles'
import {TracksAPI} from '../api/tracksAPI'
import {fetchTracks} from '../store/action-creators/track'
import {useDispatch} from 'react-redux'
import classes from './TrackItem.module.css'

interface TrackItemProps {
    track: ITrack
    active?: boolean
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const {pauseTrack, playTrack, setActiveTrack} = useActions()
    const router = useRouter()
    const dispatch= useDispatch()
    const deleteOne = async (id)=>{
        await TracksAPI.deleteOne(id).then()
        await dispatch(await fetchTracks())
    }
    const play = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setActiveTrack(track)
        playTrack()
    }
    const pause = (e) => {
        e.stopPropagation()
        e.preventDefault()

        setActiveTrack(track)
        pauseTrack()
    }
    return (
        <Card className={classes.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton className={classes.play}>
                {active
                    ? <Pause onClick={play}/>
                    : <PlayArrow onClick={pause}/>
                }
            </IconButton>
            <img className={classes.image} src={baseURL + track.picture} alt={'Обложка трека'}/>
            <Grid className={classes.name} container direction={'column'}>
                <div>{track.name}</div>
                <div className={classes.author}>{track.artist}</div>
            </Grid>
            <div className={classes.length}><Timer/>5:22</div>
            <IconButton className={classes.delete} onClick={e => e.stopPropagation()}>
                <Delete onClick={()=>{deleteOne(track._id)}} />
            </IconButton>
        </Card>
    )
}
export default TrackItem