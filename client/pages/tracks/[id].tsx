import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Button, Card, Grid, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import {TracksAPI} from '../../api/tracksAPI'
import {baseURL} from '../../api'
import {useFormik} from 'formik'
import {ITrack} from '../../types/track'
import {ArrowBackIos, GTranslate, Hearing, InsertComment, Person, Title} from '@material-ui/icons'
import classes from './[id].module.css'
import cookies from 'next-cookies'
import CommentFC from '../../components/comment'
import {setPlayer} from '../../store/action-creators/player'
import {NextThunkDispatch, wrapper} from '../../store'
import {getSession} from 'next-auth/client'
import {UsersActionTypes} from '../../types/user'

const TrackPage = ({serverTrack, token}) => {
    const router = useRouter()
    const [track, setTrack] = useState<ITrack>(serverTrack)

    const formik = useFormik({
        initialValues: {
            text: '',
            trackId: serverTrack._id
        },

        onSubmit: async values => {
            TracksAPI.addComment(values, token).then((comment: any)=>{
            setTrack({...track, comments: [...track.comments, comment.data]})

                }
            )
        }
    })
    return (
        <MainLayout
            title={'Музыкальная площадка - ' + track.name + ' - ' + track.artist}
            keywords={'Музыка, артисты,' + track.name + track.artist}
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
                        <img src={baseURL + track.picture} className={classes.img} alt={'Обложка трека'}/>
                        <div style={{marginLeft: '30px'}}>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}><Title/>Название</h3>
                                <h3 className={classes.item_value}>{track.name}</h3>
                            </div>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}><Person/>Автор</h3>
                                <h3 className={classes.item_value}>{track.artist}</h3>
                            </div>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}><Hearing/>Прослушиваний</h3>
                                <h3 className={classes.item_value}>{track.listens}</h3>
                            </div>
                        </div>
                    </Grid>
                </Card>
                <Card>
                    <div className={classes.card}>
                        <h3 className={classes.title}><GTranslate/> Слова к песне</h3>
                        <p className={classes.text}>{track.text}</p>
                    </div>

                    <Grid container className={classes.card}>
                        <form onSubmit={formik.handleSubmit} className={classes.form}>
                            <h3 className={classes.title}>
                                <InsertComment/> {
                                track.comments.length===0
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
                        track.comments.map((comment: any) =>
                            <CommentFC key={comment._id} comment={comment}/>
                        )
                    }
                </Card>

            </Grid>
        </MainLayout>
    )
}

export default TrackPage
export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const session= await getSession(ctx)

    const player = cookies(ctx).player;
    const theme = cookies(ctx).theme;

    dispatch( setPlayer(player))
    dispatch({
        type: UsersActionTypes.HANDLE_CHANGE_DARK,
        payload: theme || false
    })

    const response = await TracksAPI.getOne(ctx.params.id, session.accessToken)
    return {
        props: {
            serverTrack: response.data,
            token: session.accessToken
        }

    }
})