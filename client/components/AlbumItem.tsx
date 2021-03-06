import React from 'react'
import {Card, Grid, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {useRouter} from 'next/router'
import {baseURL} from '../api'
import {deleteTrack, fetchTracks} from '../store/action-creators/track'
import {useDispatch} from 'react-redux'
import classes from './TrackItem.module.css'
import {IAlbum} from '../types/album'
import {deleteAlbum} from "../store/action-creators/album";

interface AlbumItemProps {
    album: IAlbum
    token: string
    userId: string
}

const AlbumItem: React.FC<AlbumItemProps> = ({album,  token,userId}) => {
    const router = useRouter()
    const dispatch= useDispatch()
    const deleteOne = async ()=>{
        dispatch(deleteAlbum(album._id, token))
    }
    const isNotOwner = album.userId!=userId
    return (
        <Card className={classes.track}>
            <img className={classes.image} src={baseURL + album.picture} alt={'Обложка альбома'}/>
            <Grid className={classes.name} container direction={'column'}  onClick={() => router.push('/albums/' + album._id)}>
                <div>{album.name}</div>
                <div className={classes.author}>{album.author}</div>
            </Grid>
            <IconButton disabled={isNotOwner} className={classes.delete} onClick={e => e.stopPropagation()}>
                <Delete onClick={deleteOne} />
            </IconButton>
        </Card>
    )
}
export default AlbumItem