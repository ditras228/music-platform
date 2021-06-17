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

const TrackPage = ({serverTrack}) => {
    withAutoRedirect(false)
    const router = useRouter()
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const formik = useFormik({
        initialValues: {
            username: '',
            text: '',
            trackId: serverTrack._id
        },
        onSubmit: async values => {
            const response = TracksAPI.addComment(values)
            const data = await response.then(res => res.data)
            setTrack({...track, comments: [...track.comments, data]})
        }
    })
    return (
        <MainLayout
            title={'Музыкальная площадка - ' + track.name + ' - ' + track.artist}
            keywords={'Музыка, артисты,' + track.name + track.artist}
        >
            <Grid container className={classes.grid}>
                <Button
                    variant={'outlined'}
                    style={{fontSize: 32}}
                    onClick={() => router.push('/tracks')}
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
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    name={'username'}
                                    label='Ваше имя'
                                    fullWidth
                                >
                                </TextField>
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
                            <Card className={classes.comment}>
                                <img className={classes.comment_img}
                                     src="http://placehold.it/80x80" alt='Ава комментатора'/>
                                <div className={classes.comment_author}>
                                    {comment.username}
                                </div>
                                <div
                                    className={classes.comment_text}
                                >
                                    {comment.text}
                                </div>
                            </Card>
                        )
                    }
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default TrackPage
export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await TracksAPI.getOne(params.id)
    return {
        props: {
            serverTrack: response.data
        }

    }
}