import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Button, Card, Grid, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import TrackList from '../../components/TrackList'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {NextThunkDispatch, wrapper} from '../../store'
import {fetchTracks, searchTracks} from '../../store/action-creators/track'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {PlusOne, RotateLeft, Search} from '@material-ui/icons'
import classes from './index.module.css'
import {Auth} from '../../store/action-creators/user'
import cookies from 'next-cookies'
const Index = ({token}) => {
    const router = useRouter()
    const {tracks,  error} = useTypedSelector(state => state.track)

    const [timer, setTimer] = useState(null)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            query: ''
        },
        onSubmit: async values => {
            await handleSearch(values)
        },
    })
    const handleSearch = async (values) => {
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(await searchTracks(values))
            }, 500)
        )
    }

    if (error) {
        return (
            <MainLayout title={error}>
                <Card className={classes.error}>
                    <Button>
                        <RotateLeft/>
                    </Button>
                    <h2>{error}</h2>
                </Card>
            </MainLayout>
        )
    }
    return (
        <MainLayout title={'Список треков'}>

            <Grid container justify={'center'}>
                <Card className={classes.card}>
                        <Grid container justify={'space-between'} direction={'row'}>
                            <h2 className={classes.title}><Search/>Список треков</h2>
                                <Button onClick={() => router.push('/album/create')}>Новый альбом</Button>
                        </Grid>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                label={'Найти альбом'}
                                fullWidth
                                name={'query'}
                                value={formik.values.query}
                                onChange={async (e) => {
                                    formik.handleChange(e)
                                    await handleSearch(formik.values)
                                }}
                            />
                        </form>
                    <TrackList tracks={tracks} token={token}/>
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const token = cookies(ctx).token;
    await dispatch( Auth(token))
    await dispatch( fetchTracks(token))
    return {
        props:{
            token: token
        }
    }
})
