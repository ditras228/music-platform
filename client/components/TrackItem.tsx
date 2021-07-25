import React, {useState} from 'react'
import {ITrack, TrackActionTypes} from '../types/track'
import {Card, Checkbox, Grid, IconButton} from '@material-ui/core'
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
import {useFormikContext} from 'formik'
import {useTypedSelector} from '../hooks/useTypedSelector'

interface TrackItemProps {
    track: ITrack
    active?: boolean
    token: string
    view?: string
    userId?: string
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false, token, view, userId}) => {
    const {pauseTrack, playTrack, setActiveTrack} = useActions()
    const router = useRouter()
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)
    const tracks = useTypedSelector(state => state.album.albumTracks)

    const deleteOne = async () => {
        await TracksAPI.deleteOne(track._id, token)
        dispatch(fetchTracks(token))
    }
    const editState = () => {
        setChecked(!checked)
        checked
            ?
            dispatch({
                type: AlbumActionTypes.ADD_TRACK_TO_ALBUM,
                payload: {track}
            })
            :
            dispatch({
                type: AlbumActionTypes.REMOVE_TRACK_FROM_ALBUM,
                payload: {track}
            })

        console.log('cringe')
        console.log(tracks)
        console.log(track)

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
        <Card className={classes.track} onClick={() => {
            view !== 'checkbox'
                ? router.push('/tracks/' + track._id)
                : editState()
        }
        }>
            <SwitchView view={view} checked={checked}
                        deleteOne={deleteOne}
                        editState={editState}/>
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
        </Card>
    )
}
const SwitchView = ({view, deleteOne, checked, editState}) => {
    switch (view) {
        case 'checkbox':
            return (
                <Checkbox checked={checked} onChange={editState} name="checkbox"/>
            )
        default:
            return (
                <IconButton className={classes.delete} onClick={e => e.stopPropagation()}>
                    <Delete onClick={deleteOne}/>
                </IconButton>
            )

    }
}
export default TrackItem