import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Button, Card, Grid} from '@material-ui/core'
import {useRouter} from 'next/router'
import TrackList from '../../components/TrackList'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {NextThunkDispatch, wrapper} from '../../store'
import {fetchTracks} from '../../store/action-creators/track'
import {RotateLeft, Search} from '@material-ui/icons'
import classes from './index.module.css'
import {Auth} from '../../store/action-creators/user'
import cookies from 'next-cookies'
import {withAutoRedirect} from '../../hooks/withAutoRedirect'

const Index = ({token,isAuth}) => {
    const router = useRouter()
    const {tracks,  error} = useTypedSelector(state => state.track)
    const { isFallback } = router

    if (isFallback) {
        return <div>Loading...</div>
    }
    withAutoRedirect(false, isAuth, router)
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
        <MainLayout title={'Треки'}>

            <Grid container justify={'center'}>
                <Card className={classes.card}>
                        <Grid container justify={'space-between'} direction={'row'}>
                            <h2 className={classes.title}><Search/>Список треков</h2>
                            <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
                        </Grid>

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
    const isAuth = cookies(ctx).isAuth;
    await dispatch( Auth(token))
    await dispatch( fetchTracks(token))

    return {
        props:{
            token: token || null,
            isAuth: isAuth || null
        }
    }
})
