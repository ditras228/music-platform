import React from 'react'
import {Card, Grid, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {useRouter} from 'next/router'
import {baseURL} from '../api'
import {fetchTracks} from '../store/action-creators/track'
import {useDispatch} from 'react-redux'
import classes from './TrackItem.module.css'
import {AlbumsAPI} from '../api/albumsAPI'
import {IAlbum} from '../types/album'

interface AlbumItemProps {
    album: IAlbum
    token: string
    userId: string
}

const AlbumItem: React.FC<AlbumItemProps> = ({album,  token,userId}) => {
    const router = useRouter()
    const dispatch= useDispatch()
    const deleteOne = async ()=>{
        await AlbumsAPI.deleteOneAlbum(album._id, token).then()
         dispatch( fetchTracks(token))
    }
    const isNotOwner = album.userId!=userId
    return (
        <Card className={classes.track} onClick={() => router.push('/albums/' + album._id)}>
            <img className={classes.image} src={baseURL + album.picture} alt={'Обложка альбома'}/>
            <Grid className={classes.name} container direction={'column'}>
                <div>{album.name}</div>
                <div className={classes.author}>{album.artist}</div>
            </Grid>
            <IconButton disabled={isNotOwner} className={classes.delete} onClick={e => e.stopPropagation()}>
                <Delete onClick={deleteOne} />
            </IconButton>
        </Card>
    )
}
export default AlbumItem