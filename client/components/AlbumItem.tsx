import React from 'react'
import {IAlbum, ITrack} from '../types/track'
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
    album: IAlbum
    token: string
}

const AlbumItem: React.FC<AlbumItemProps> = ({album,  token}) => {
    const router = useRouter()
    const dispatch= useDispatch()
    const deleteOne = async (id)=>{
        await TracksAPI.deleteOneAlbum(id, token).then()
         dispatch( fetchTracks(token))
    }
    return (
        <Card className={classes.track} onClick={() => router.push('/tracks/' + album._id)}>
            <img className={classes.image} src={baseURL + album.picture} alt={'Обложка трека'}/>
            <Grid className={classes.name} container direction={'column'}>
                <div>{album.name}</div>
                <div className={classes.author}>{album.artist}</div>
            </Grid>
            <IconButton className={classes.delete} onClick={e => e.stopPropagation()}>
                <Delete onClick={()=>{deleteOne(album._id)}} />
            </IconButton>
        </Card>
    )
}
export default AlbumItem