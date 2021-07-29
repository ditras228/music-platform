import React, {useEffect, useState} from 'react'
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
import {AlbumActionTypes, IAlbum} from '../../types/album'
import {AlbumsAPI} from '../../api/albumsAPI'
import {getSession} from 'next-auth/client'
import {DefaultSession} from 'next-auth'
import CommentFC from '../tracks/comment'
import {useFormik} from 'formik'
import {setPlayer} from '../../store/action-creators/player'
import {NextThunkDispatch, wrapper} from '../../store'
import {io} from 'socket.io-client'
import {ITrack} from '../../types/track'

const AlbumPage = ({serverAlbum, allTracks, token}) => {
    const router = useRouter()
    const {albumTracks} = useTypedSelector(state => state.album)
    const [editAlbum, setAlbumEdit] = useState(false)
    const [albumName, setAlbumName] = useState('')
    let albumOwner = false
    const dispatch = useDispatch()
    const [album, setAlbum] = useState<IAlbum>(serverAlbum)


    if (album.userId === token) {
        albumOwner = true
    }
    console.log(album)


    const editAlbumHandler = async () => {
        await AlbumsAPI.editAlbum(albumTracks.map(track => track._id), token)
    }

    useEffect(()=>{
        const socket=io(baseURL)
        socket.on('addComment', function (data){
            setAlbum({...album, comments: [...album.comments, data]})
        })
    },[])

    const formik = useFormik({
        initialValues: {
            text: '',
            trackId: album._id
        },

        onSubmit: async values => {
            TracksAPI.addComment(values, token)
        }
    })
    return (
        <MainLayout
            title={'Музыкальная площадка - ' + album.name + ' - ' + album.artist}
            keywords={'Музыка, артисты,' + album.name + album.artist}
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
                        <img src={baseURL + album.picture} className={classes.img} alt={'Обложка трека'}/>
                        <div style={{marginLeft: '30px'}}>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}><Title/>Название</h3>
                                <h3 className={classes.item_value}>{album.name}</h3>
                            </div>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}><Person/>Автор</h3>
                                <h3 className={classes.item_value}>{album.artist}</h3>
                            </div>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}><Hearing/>Прослушиваний</h3>
                                <h3 className={classes.item_value}>{album.listens}</h3>
                            </div>
                        </div>
                    </Grid>
                </Card>
                <Card>
                    <div className={classes.card}>
                        <h3 className={classes.title}><GTranslate/> Описание альбома</h3>
                        <p className={classes.text}>{album.text}</p>
                    </div>
                </Card>
                <Card>
                    <div className={classes.card}>
                    <h3 className={classes.title}><MusicNote/> Треки</h3>
                    <TrackList tracks={album.tracks} token={token} userId={token}/>
                    </div>
                </Card>
                <Card>
                    <div className={classes.card}>
                        <h3 className={classes.title}><GTranslate/> Слова к песне</h3>
                        <p className={classes.text}>{album.text}</p>
                    </div>

                    <Grid container className={classes.card}>
                        <form onSubmit={formik.handleSubmit} className={classes.form}>
                            <h3 className={classes.title}>
                                <InsertComment/> {
                                album.comments.length===0
                                    ?'нет комментариев'
                                    :'комментарии'
                            }
                            </h3>
                            <Grid className={classes.comments_form}>
                                <TextField
                                    className={classes.comments_input}
                                    value={formik.values.text}
                                    onChange={formik.handleChange}
                                    name={'text'}
                                    label='Оставьте комментарий'
                                    fullWidth
                                    multiline
                                >
                                </TextField>
                                <Button
                                    type={'submit'}
                                    className={classes.comments_submit}
                                >Отправить
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                    {
                        album.comments.map(comment =>
                            <CommentFC comment={comment}/>
                        )
                    }
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default AlbumPage
export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch

    const session = await getSession(ctx)

    const response = await AlbumsAPI.getOneAlbum(ctx.params.id, session.accessToken)
    const responseTracks = await TracksAPI.getTracks(session.accessToken)

    const player = cookies(ctx).player;
    await dispatch( setPlayer(player))
    return {
        props: {
            serverAlbum: response.data,
            allTracks: responseTracks.data,
            token: session.accessToken,
        }

    }
})
