import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Button, Card, Grid, makeStyles, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import {GetServerSideProps} from 'next'
import {TracksAPI} from '../../api/tracksAPI'
import {baseURL} from '../../api'
import {useFormik} from 'formik'
import {ITrack} from '../../types/track'
import {ArrowBackIos, GTranslate, Hearing, InsertComment, Person, Title} from '@material-ui/icons'
import {withAutoRedirect} from '../../hooks/withAutoRedirect'
import classes from './[id].module.css'
import cookies from 'next-cookies'
import CommentFC from './comment'
import {setPlayer} from '../../store/action-creators/player'
import {NextThunkDispatch, wrapper} from '../../store'

const TrackPage = ({serverTrack, token}) => {
    const router = useRouter()
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const formik = useFormik({
        initialValues: {
            text: '',
            trackId: serverTrack._id
        },
        onSubmit: async values => {
            const response = TracksAPI.addComment(values, token)
            const data = await response.then(res => res.data)
            setTrack({...track, comments: [...track.comments, data]})
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
                    style={{fontSize: 32}}
                    onClick={() => router.push('/')}
                >
                    <ArrowBackIos/> К списку
                </Button>
                <Card>
                    <Grid container className={classes.info}>
                        <img src={baseURL + track.picture} className={classes.img} alt={'Обложка трека'}/>
                        <div style={{marginLeft: '30px'}}>
                            <div className={classes.line}>
                                <h2 className={classes.item_title}><Title/>Название</h2>
                                <h2 className={classes.item_value}>{track.name}</h2>
                            </div>
                            <div className={classes.line}>
                                <h2 className={classes.item_title}><Person/>Автор</h2>
                                <h2 className={classes.item_value}>{track.artist}</h2>
                            </div>
                            <div className={classes.line}>
                                <h2 className={classes.item_title}><Hearing/>Прослушиваний</h2>
                                <h2 className={classes.item_value}>{track.listens}</h2>
                            </div>
                        </div>
                    </Grid>
                </Card>
                <Card className={classes.card}>
                    <h2 className={classes.title}><GTranslate/> Слова к песне</h2>
                    <p className={classes.text}>{track.text}</p>
                </Card>
                <Card>
                    <Grid container className={classes.card}>
                        <form onSubmit={formik.handleSubmit} className={classes.form}>
                            <h2 className={classes.title}><InsertComment/> Комментарии</h2>
                            <Grid className={classes.comments_form}>
                                <TextField
                                    className={classes.comments_input}
                                    value={formik.values.text}
                                    onChange={formik.handleChange}
                                    name={'text'}
                                    label='Комментарий'
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
                        serverTrack.comments.map(comment =>
                            <CommentFC comment={comment}/>
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
    const token = cookies(ctx).token;
    const response = await TracksAPI.getOne(ctx.params.id, token)
    const player = cookies(ctx).player;
    await dispatch(setPlayer(player))
    return {
        props: {
            serverTrack: response.data,
            token: token
        }

    }
})