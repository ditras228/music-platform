import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Button, Card, Grid, makeStyles, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import {GetServerSideProps} from 'next'
import {TracksAPI} from '../../api/tracksAPI'
import {baseURL} from '../../api'
import {useFormik} from 'formik'
import {ITrack} from '../../types/track'

const useStyles = makeStyles({
    grid: {
        maxWidth: '900px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '20px'
    },
    info: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        padding: '20px',
    },
    card: {
        padding: '20px'
    },
    line: {
        display: 'grid',
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
    },
    item_title: {
        display: 'inline-block',
        textAlign: 'left'
    },
    item_value: {
        display: 'inline-block',
        textAlign: 'right'
    },
    comments_form:{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: 'auto'
    }
})

const TrackPage = ({serverTrack}) => {
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
            title={'Музыкальная плошадка - ' + track.name + ' - ' + track.artist}
            keywords={'Музыка, артисты,' + track.name + track.artist}
        >
            <Grid container className={classes.grid}>
                <Button
                    variant={'outlined'}
                    style={{fontSize: 32}}
                    onClick={() => router.push('/tracks')}
                >
                    К списку
                </Button>
                <Card>
                    <Grid container className={classes.info}>
                        <img src={baseURL + track.picture} width={200} height={200} alt={'Обложка трека'}/>
                        <div style={{marginLeft: '30px'}}>
                            <div className={classes.line}>
                                <h2 className={classes.item_title}>Название</h2>
                                <h2 className={classes.item_value}>{track.name}</h2>
                            </div>
                            <div className={classes.line}>
                                <h2 className={classes.item_title}>Автор</h2>
                                <h2 className={classes.item_value}>{track.artist}</h2>
                            </div>
                            <div className={classes.line}>
                                <h2 className={classes.item_title}>Прослушиваний</h2>
                                <h2 className={classes.item_value}>{track.listens}</h2>
                            </div>
                        </div>
                    </Grid>
                </Card>
                <Card className={classes.card}>
                    <h2>Слова к песне</h2>
                    <p>{track.text}</p>
                    <h2>Комментарии</h2>
                    <Grid container>
                        <form onSubmit={formik.handleSubmit}>
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
                                    value={formik.values.text}
                                    onChange={formik.handleChange}
                                    name={'text'}
                                    label='Комментарий'
                                    fullWidth
                                    multiline
                                    rows={4}
                                >
                                </TextField>
                                <Button type={'submit'}>Отправить</Button>
                            </Grid>
                        </form>
                    </Grid>
                </Card>
                {
                    serverTrack.comments.map(comment =>
                        <div>
                            <div>Автор - {comment.username}</div>
                            <div>Комментарий - {comment.text}</div>
                        </div>
                    )
                }
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