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

interface TrackItemProps {
    track: ITrack
    active?: boolean
}

const useStyles = makeStyles({
    track: {
        marginBottom: '5px',
        padding: '10px',
        display: 'grid',
        gridColumnGap: '15px',
        gridTemplateColumns: 'auto auto 1fr auto',
        gridTemplateRows: '2fr 1r',
        textAlign: 'left',
        '&:hover': {
            backgroundColor: '#f2f3f4',
            cursor: 'pointer'
        },
        '&:active': {
            opacity: '0.7'
        }
    },
    play: {
        gridColumn: '1 / 2',
        gridRow: '1 / 3',
    },
    image: {
        gridColumn: '2 / 3',
        gridRow: '1 / 3',
        width: '80px',
        height: '80px'
    },
    name: {
        gridColumn: '3 / 4',
        gridRow: '1 / 2',
        fontSize: '19px',
        fontWidth: '600',
        textAlign: 'left'
    },
    author:{
        fontSize: '16px',
        color: 'gray'
    },
    delete: {
        gridColumn: '4 / 5',
        gridRow: '1 / 3'
    },
    length:{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gridGap: '10px',
        alignItems: 'center',
        fontSize: '15px'
    }

})

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const {pauseTrack, playTrack, setActiveTrack} = useActions()
    const router = useRouter()
    const classes = useStyles()
    const dispatch= useDispatch()
    const deleteOne = async (id)=>{
        await TracksAPI.deleteOne(id).then()
        await dispatch(await fetchTracks())
    }
    const play = (e) => {
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
    }
    const pause = (e) => {
        e.stopPropagation()

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
            <div className={classes.length}><Timer/> 3:44/5:22</div>
            <IconButton className={classes.delete} onClick={e => e.stopPropagation()}>
                <Delete onClick={()=>{deleteOne(track._id)}} />
            </IconButton>
        </Card>
    )
}
export default TrackItem