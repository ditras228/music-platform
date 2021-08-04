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
import cookies from 'next-cookies'
import {setPlayer} from '../../store/action-creators/player'
import {getSession} from 'next-auth/client'
import {UsersActionTypes} from '../../types/user'

const Index = ({token, userId}) => {
    const router = useRouter()
    const {tracks,  error} = useTypedSelector(state => state.track)
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

                    <TrackList tracks={tracks} token={token} userId={userId}/>
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const session= await getSession({req: ctx.req})
    //const token= await getToken({req: ctx.req})
    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    await dispatch( fetchTracks(session.accessToken))

    const player = cookies(ctx).player;
    const theme = cookies(ctx).theme;

    dispatch( setPlayer(player))
    dispatch({
        type: UsersActionTypes.HANDLE_CHANGE_DARK,
        payload: theme || false
    })
    return {
        props:{
            token: session.accessToken || null,
            userId: session.id || null,
        }
    }
})
