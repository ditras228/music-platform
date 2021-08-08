import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Avatar, Button, Card, Grid, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import {baseURL} from '../../api'
import {ArrowBackIos, GTranslate, Hearing, InsertComment, MusicNote, Person, Title} from '@material-ui/icons'
import classes from './[id].module.css'
import cookies from 'next-cookies'
import TrackList from '../../components/TrackList'
import {IAlbum} from '../../types/album'
import {AlbumsAPI} from '../../api/albumsAPI'
import {getSession, useSession} from 'next-auth/client'
import CommentFC from '../../components/comment'
import {useFormik} from 'formik'
import {setPlayer} from '../../store/action-creators/player'
import {NextThunkDispatch, wrapper} from '../../store'
import {UsersActionTypes} from '../../types/user'
import * as yup from 'yup'
import {Alert} from '@material-ui/lab'

const commentSchema=yup.object({
    text: yup.string()
        .min(1, 'Минимум 1 символ')
        .max(2000, 'Максимум 200 символов')
        .required()
})

const AlbumPage = ({serverAlbum, token}) => {
    const router = useRouter()
    const [album, setAlbum] = useState<IAlbum>(serverAlbum)
    const [ session, loading ] = useSession() as any

    const formik = useFormik({
        initialValues: {
            text: '',
            albumId: album._id
        },
        validationSchema: commentSchema,
        onSubmit: async values => {
            AlbumsAPI.addComment(values, token).then((comment: any)=>
                setAlbum({...album, comments: [...album.comments, comment.data]})
            )
        }
    })
    return (
        <MainLayout
            title={'Музыкальная площадка - ' + album.name + ' - ' + album.author}
            keywords={'Музыка, артисты,' + album.name + album.author}
        >
            <Grid className={classes.grid}>
                <Button
                    variant={'outlined'}
                    style={{fontSize: 20}}
                    onClick={() => router.push('/albums')}
                >
                    <ArrowBackIos/> К списку
                </Button>
                <Card>

                    <Grid className={classes.info}>
                        <div className={classes.img_thumb}>
                        <img src={baseURL + album.picture} className={classes.img} alt={'Обложка трека'}/>
                        </div>
                        <div style={{marginLeft: '30px'}}>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}><Title/>Название</h3>
                                <h3 className={classes.item_value}>{album.name}</h3>
                            </div>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}><Person/>Автор</h3>
                                <h3 className={classes.item_value}>{album.author}</h3>
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
                    <h3 className={classes.title}><MusicNote/> Треки</h3>
                    <TrackList tracks={album.tracks} token={token} userId={token}/>
                    </div>
                </Card>
                <Card>
                    <Grid container className={classes.card}>
                        <form onSubmit={formik.handleSubmit} className={classes.form}>
                            <h3 className={classes.title}>
                                <InsertComment/> {
                                album.comments.length===0
                                    ?'нет комментариев'
                                    :'комментарии'
                            }
                            </h3>
                            {session&&
                            <div className={classes.comments_form}>
                                <div className={classes.avatar_comment}>
                                    <Avatar alt="Remy Sharp" src={session.image}
                                            style={{backgroundColor: session.color || 'gray', marginRight:20}}>
                                        {session.user?.name?.substring(0,1)}
                                    </Avatar>
                                    <TextField
                                        value={formik.values.text}
                                        onChange={formik.handleChange}
                                        name={'text'}
                                        label='Оставьте комментарий'
                                        fullWidth
                                        multiline
                                    >
                                    </TextField>
                                </div>
                                {formik.errors.text && formik.touched.text &&
                                <Alert variant="filled" severity="error">
                                    {formik.errors.text}
                                </Alert>}
                                <Button
                                    type={'submit'}
                                    className={classes.comments_submit}
                                >Отправить
                                </Button>
                            </div>
                            }
                        </form>
                    </Grid>
                    {
                        album.comments.map((comment: any) =>
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

    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const player = cookies(ctx).player;
    const theme = cookies(ctx).theme;

    dispatch( setPlayer(player))
    const response = await AlbumsAPI.getOneAlbum(ctx.params.id, session.accessToken)


    dispatch({
        type: UsersActionTypes.HANDLE_CHANGE_DARK,
        payload: theme || false
    })
    return {
        props: {
            serverAlbum: response.data,
            token: session.accessToken,
        }

    }
})
