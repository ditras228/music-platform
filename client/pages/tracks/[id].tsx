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

const useStyles = makeStyles({
    grid: {
        maxWidth: '900px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '20px'
    },
    info: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        padding: '20px',
        ['@media (max-width: 600px)']: {
            gridTemplateColumns: 'auto',
            gridTemplateRows: 'auto auto',
            gridRowGap: '20px'
        }
    },
    img: {
        width: '200px',
        height: '200px',
        ['@media (max-width: 600px)']: {
            margin: '0 auto'
        }
    },
    card: {
        padding: '20px'
    },
    line: {
        display: 'grid',
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
    },
    text: {
        textAlign: 'center'
    },
    item_title: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gridGap: '10px'
    },
    item_value: {
        display: 'inline-block',
        textAlign: 'right'
    },
    comments_form: {
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gridTemplateRows: 'auto 50px auto',
        gridGap: '10px'
    },
    comments_input: {
        gridRow: '2/4',
        gridColumn: '1/2'
    },
    comments_submit: {
        gridRow: '2/3',
        gridColumn: '2/3'
    },
    form: {
        width: '100%'
    },
    comment: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: 'auto auto',
        gridColumnGap: '20px',
        padding: '20px',
        fontSize: '16px'

    },
    comment_img: {
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        gridColumn: '1/2',
        gridRow: '1/3'
    },
    comment_author: {
        gridColumn: '2/3',
        gridRow: '1/2',
        fontWeight: 'bold'
    },
    comment_text: {
        gridColumn: '2/3',
        gridRow: '2/3'
    },
    title:{
        marginLeft: '10px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gridGap: '10px'
    }
})

const TrackPage = ({serverTrack}) => {
    withAutoRedirect()
    const router = useRouter()
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const classes = useStyles()
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