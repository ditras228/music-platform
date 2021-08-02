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
}

const AlbumItem: React.FC<AlbumItemProps> = ({album,  token}) => {
    const router = useRouter()
    const dispatch= useDispatch()
    const deleteOne = async (id)=>{
        await AlbumsAPI.deleteOneAlbum(id, token).then()
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