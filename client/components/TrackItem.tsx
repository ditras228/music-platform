import React from 'react'
import {ITrack, TrackActionTypes} from '../types/track'
import {Card, Grid, IconButton} from '@material-ui/core'
import {Delete, DeleteRounded, ExposurePlus1, Pause, PlayArrow, Timer} from '@material-ui/icons'
import {useRouter} from 'next/router'
import {useActions} from '../hooks/useAction'
import {baseURL} from '../api'
import {TracksAPI} from '../api/tracksAPI'
import {fetchTracks} from '../store/action-creators/track'
import {useDispatch} from 'react-redux'
import classes from './TrackItem.module.css'
import {AlbumActionTypes} from '../types/album'
import {useSession} from 'next-auth/client'
import {Session} from '../pages/albums/[id]'

interface TrackItemProps {
    track: ITrack
    active?: boolean
    token: string
    view: string
    userId?: string
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false, token, view, userId}) => {
    const {pauseTrack, playTrack, setActiveTrack} = useActions()
    const router = useRouter()
    const dispatch = useDispatch()
    const [session] = useSession() as any

    const deleteOne = async () => {
        await TracksAPI.deleteOne(track._id, token)
        dispatch(fetchTracks(token))
    }
    const addOne = () => {
        dispatch({
            type: AlbumActionTypes.ADD_TRACK_TO_ALBUM,
            payload: {track}
        })
    }
    const removeOne = () => {
        dispatch({
            type: AlbumActionTypes.REMOVE_TRACK_FROM_ALBUM,
            payload: {track}
        })
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
            {
                view !== 'album_item'
                    ?
                    <IconButton className={classes.delete} onClick={e => e.stopPropagation()}>
                        <Delete onClick={deleteOne}/>
                    </IconButton>

                    :
                    session.user._id===userId &&
                    <>
                        <IconButton className={classes.delete} onClick={e => e.stopPropagation()}>
                            <ExposurePlus1 onClick={addOne}/>
                        </IconButton>
                        <IconButton className={classes.delete} onClick={e => e.stopPropagation()}>
                            <DeleteRounded onClick={removeOne}/>
                        </IconButton>
                    </>

            }

        </Card>
    )
}
export default TrackItem