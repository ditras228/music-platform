import React, {useState} from 'react'
import {ITrack} from '../types/track'
import {Card, Checkbox, Grid, IconButton} from '@material-ui/core'
import {Delete, Pause, PlayArrow} from '@material-ui/icons'
import {useRouter} from 'next/router'
import {useActions} from '../hooks/useAction'
import {baseURL} from '../api'
import {TracksAPI} from '../api/tracksAPI'
import {useDispatch} from 'react-redux'
import classes from './TrackItem.module.css'
import {AlbumActionTypes} from '../types/album'
import {useFormikContext} from 'formik'
import {useTypedSelector} from '../hooks/useTypedSelector'
import {deleteTrack} from "../store/action-creators/track";

interface TrackItemProps {
    track: ITrack
    active?: boolean
    view?: string
    token: string
    userId: string
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false, view, userId, token}) => {
    const {pauseTrack, playTrack, setActiveTrack} = useActions()
    const router = useRouter()
    const dispatch = useDispatch()
    const [isChecked, setChecked] = useState(false)
    const formik = useFormikContext()
    const tracks = useTypedSelector(state => state.album.albumTracks)

    const deleteOne = async () => {
        dispatch(deleteTrack(track._id, token))
    }
    const editState = () => {
        setChecked(!isChecked)
        if (isChecked === false) {
            formik.setFieldValue('tracks', formik.values.tracks.filter(trackId=>trackId!==track._id))
        }
        if (isChecked === true) {
            formik.setFieldValue('tracks', formik.values.tracks.push(track._id))
        }

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
        <Card className={classes.track}>
            <SwitchView view={view} checked={isChecked}
                        deleteOne={deleteOne}
                        track={track}
                        userId={userId}/>
            <IconButton className={classes.play}>
                {active
                    ? <Pause onClick={play}/>
                    : <PlayArrow onClick={pause}/>
                }
            </IconButton>
            <div className={classes.track_info}
                onClick={() => {
                view !== 'checkbox'
                    ? router.push('/tracks/' + track._id)
                    : editState()
            }
            }>
                <img className={classes.image} src={baseURL + track.picture} alt={'Обложка трека'}/>
                <Grid className={classes.name} container direction={'column'}>
                    <div>{track.name}</div>
                    <div className={classes.author}>{track.artist}</div>
                </Grid>
            </div>

        </Card>
    )
}
const SwitchView = ({view, deleteOne, checked, userId, track,  editState}) => {
    const isNotOwner = userId != track.userId
    switch (view) {
        case 'checkbox':
            return (
                <Checkbox checked={checked} name="checkbox" className={classes.delete} onClick={editState}/>
            )
        default:
            return (
                <IconButton disabled={isNotOwner} className={classes.delete} onClick={e => e.stopPropagation()}>
                    <Delete onClick={deleteOne}/>
                </IconButton>
            )

    }
}
export default TrackItem