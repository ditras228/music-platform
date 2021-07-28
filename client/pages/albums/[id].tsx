import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Button, Card, Grid, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import {GetServerSideProps} from 'next'
import {TracksAPI} from '../../api/tracksAPI'
import {baseURL} from '../../api'
import {
    ArrowBackIos,
    GTranslate,
    Hearing,
    InsertComment,
    MusicNote,
    Note,
    Person,
    Settings,
    Title
} from '@material-ui/icons'
import classes from './[id].module.css'
import cookies from 'next-cookies'
import TrackList from '../../components/TrackList'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {useDispatch} from 'react-redux'
import {AlbumActionTypes} from '../../types/album'
import {AlbumsAPI} from '../../api/albumsAPI'
import {getSession} from 'next-auth/client'
import {DefaultSession} from 'next-auth'
import CommentFC from '../tracks/comment'
import {useFormik} from 'formik'

const TrackPage = ({serverAlbum, allTracks, token}) => {
    const router = useRouter()
    const {albumTracks} = useTypedSelector(state => state.album)
    const [editAlbum, setAlbumEdit] = useState(false)
    const [albumName, setAlbumName] = useState('')
    let albumOwner = false
    const dispatch = useDispatch()


    if (serverAlbum.userId === token) {
        albumOwner = true
    }
    console.log(serverAlbum)


    const editAlbumHandler = async () => {
        await AlbumsAPI.editAlbum(albumTracks.map(track => track._id), token)
    }
    return (
        <MainLayout
            title={'Музыкальная площадка - ' + serverAlbum.name + ' - ' + serverAlbum.artist}
            keywords={'Музыка, артисты,' + serverAlbum.name + serverAlbum.artist}
        >
            <Grid className={classes.grid}>
                <Button
                    variant={'outlined'}
                    style={{fontSize: 20}}
                    onClick={() => router.push('/')}
                >
                    <ArrowBackIos/> К списку
                </Button>
                <Card>

                    <Grid className={classes.info}>
                        <img src={baseURL + serverAlbum.picture} className={classes.img} alt={'Обложка трека'}/>
                        <div style={{marginLeft: '30px'}}>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}><Title/>Название</h3>
                                <h3 className={classes.item_value}>{serverAlbum.name}</h3>
                            </div>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}><Person/>Автор</h3>
                                <h3 className={classes.item_value}>{serverAlbum.artist}</h3>
                            </div>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}><Hearing/>Прослушиваний</h3>
                                <h3 className={classes.item_value}>{serverAlbum.listens}</h3>
                            </div>
                        </div>
                    </Grid>
                </Card>
                <Card>
                    <div className={classes.card}>
                        <h3 className={classes.title}><GTranslate/> Описание альбома</h3>
                        <p className={classes.text}>{serverAlbum.text}</p>
                    </div>
                </Card>
                <Card>
                    <div className={classes.card}>
                    <h3 className={classes.title}><MusicNote/> Треки</h3>
                    <TrackList tracks={serverAlbum.tracks} token={token} userId={token}/>
                    </div>
                </Card>

            </Grid>
        </MainLayout>
    )
}

export default TrackPage
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)

    const response = await AlbumsAPI.getOneAlbum(ctx.params.id, session.accessToken)
    const responseTracks = await TracksAPI.getTracks(session.accessToken)
    return {
        props: {
            serverAlbum: response.data,
            allTracks: responseTracks.data,
            token: session.accessToken,
        }

    }
}
