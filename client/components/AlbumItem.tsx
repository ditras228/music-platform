import React from 'react'
import {ITrack} from '../types/track'
import {Card, Grid, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {useRouter} from 'next/router'
import {useActions} from '../hooks/useAction'
import {baseURL} from '../api'
import {TracksAPI} from '../api/tracksAPI'
import {fetchTracks} from '../store/action-creators/track'
import {useDispatch} from 'react-redux'
import classes from './TrackItem.module.css'

interface AlbumItemProps {
    track: ITrack
    token: string
}

const AlbumItem: React.FC<AlbumItemProps> = ({track,  token}) => {
    const {pauseTrack, playTrack, setActiveTrack} = useActions()
    const router = useRouter()
    const dispatch= useDispatch()
    const deleteOne = async (id)=>{
        await TracksAPI.deleteOne(id, token).then()
        await dispatch(await fetchTracks(token))
    }
    return (
        <Card className={classes.track} onClick={() => router.push('/tracks/' + track._id)}>
            <img className={classes.image} src={baseURL + track.picture} alt={'Обложка трека'}/>
            <Grid className={classes.name} container direction={'column'}>
                <div>{track.name}</div>
                <div className={classes.author}>{track.artist}</div>
            </Grid>
            <IconButton className={classes.delete} onClick={e => e.stopPropagation()}>
                <Delete onClick={()=>{deleteOne(track._id)}} />
            </IconButton>
        </Card>
    )
}
export default AlbumItem