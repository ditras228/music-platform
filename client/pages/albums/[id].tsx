import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Button, Card, Grid, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import {GetServerSideProps} from 'next'
import {TracksAPI} from '../../api/tracksAPI'
import {baseURL} from '../../api'
import {ArrowBackIos, GTranslate, Hearing, Person, Settings, Title} from '@material-ui/icons'
import classes from './[id].module.css'
import cookies from 'next-cookies'
import TrackList from '../../components/TrackList'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {useDispatch} from 'react-redux'
import {AlbumActionTypes} from '../../types/album'
import {AlbumsAPI} from '../../api/albumsAPI'
import {getSession} from 'next-auth/client'
import {DefaultSession} from 'next-auth'

const TrackPage = ({serverAlbum, allTracks, token, userId}) => {
    const router = useRouter()
    const {albumTracks} = useTypedSelector(state => state.album)
    const [editAlbum, setAlbumEdit] = useState(false)
    const [albumName, setAlbumName] = useState('')
    let albumOwner = false
    const dispatch = useDispatch()


    if (serverAlbum.userId === userId) {
        albumOwner = true
    }


    dispatch({
        type: AlbumActionTypes.ADD_TRACKS_TO_ALBUM,
        payload: serverAlbum.tracks
    })
    const editAlbumHandler = async () => {
        await AlbumsAPI.editAlbum(albumTracks.map(track => track._id), token)
    }

    return (
        <MainLayout
            title={'Музыкальная площадка - ' + serverAlbum.name + ' - ' + serverAlbum.artist}
            keywords={'Музыка, артисты,' + serverAlbum.name + serverAlbum.artist}
        >
            <Grid container className={classes.grid}>
                <Button
                    variant={'outlined'}
                    style={{fontSize: 32}}
                    onClick={() => router.push('/')}
                >
                    <ArrowBackIos/> К списку
                </Button>
                {albumOwner &&
                    <Button
                        variant={'outlined'}
                        style={{fontSize: 32}}
                        onClick={() => setAlbumEdit(!editAlbum)}
                    >
                        {editAlbum
                            ? <><Settings/> Редактировать альбом</>
                            : <><ArrowBackIos/> Отменить редактирование</>
                        }

                    </Button>

                }

                <Card>
                    <Grid container className={classes.info}>
                        <img src={baseURL + serverAlbum.picture} className={classes.img} alt={'Обложка альбома'}/>
                        <div style={{marginLeft: '30px'}}>
                            <div className={classes.line}>
                                <h2 className={classes.item_title}><Title/>Название</h2>
                                {editAlbum
                                    ? <h2 className={classes.item_value}>{serverAlbum.name}</h2>
                                    : (
                                        <form>
                                            <TextField
                                                label={'Найти альбом'}
                                                fullWidth
                                                name={'query'}
                                                value={albumName}
                                                onChange={(e: any) => setAlbumName(e)}
                                            />
                                        </form>
                                    )
                                }
                            </div>
                            <div className={classes.line}>
                                <h2 className={classes.item_title}><Person/>Автор</h2>
                                <h2 className={classes.item_value}>{serverAlbum.artist}</h2>
                            </div>
                            <div className={classes.line}>
                                <h2 className={classes.item_title}><Hearing/>Прослушиваний</h2>
                                <h2 className={classes.item_value}>{serverAlbum.listens}</h2>
                            </div>
                        </div>
                    </Grid>
                </Card>
                <Card className={classes.card}>
                    <TrackList tracks={albumTracks} token={token} userId={userId}/>
                    editAlbum && (
                    <TrackList tracks={allTracks} token={token} userId={}/>
                    <Button onClick={editAlbumHandler}>Подтвердить</Button>
                    )
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default TrackPage
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)

    const response = await TracksAPI.getOne(ctx.params.id, session.accessToken)
    const responseTracks = await TracksAPI.getTracks(session.accessToken)
    return {
        props: {
            serverAlbum: response.data,
            allTracks: responseTracks.data,
            token: session.accessToken,
            userId: session._id
        }

    }
}
