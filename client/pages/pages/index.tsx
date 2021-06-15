import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Box, Button, Card, Grid, makeStyles, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import TrackList from '../../components/TrackList'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {NextThunkDispatch, wrapper} from '../../store'
import {fetchTracks, searchTracks} from '../../store/action-creators/track'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {RotateLeft, Search} from '@material-ui/icons'
import classes from './index.module.css'

const Index = () => {
    const router = useRouter()
    const {tracks,  error} = useTypedSelector(state => state.user)
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
                <Card style={{width: 900}}>

                    <Box p={3}>
                        <Grid container justify={'space-between'} direction={'row'}>
                            <h2 className={classes.title}><Search/>Список треков</h2>
                            <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
                        </Grid>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                label={'Найти трек'}
                                fullWidth
                                name={'query'}
                                value={formik.values.query}
                                onChange={async (e) => {
                                    formik.handleChange(e)
                                    await handleSearch(formik.values)
                                }}
                            />
                        </form>
                    </Box>
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps
(async ({store}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks())
})