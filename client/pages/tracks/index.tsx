import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useRouter} from 'next/router'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {NextThunkDispatch, wrapper} from '../../store'
import {fetchTracks} from '../../store/action-creators/track'
import classes from './index.module.scss'
import cookies from 'next-cookies'
import {setPlayer} from '../../store/action-creators/player'
import {getSession} from 'next-auth/client'
import {UsersActionTypes} from '../../types/user'
import TrackList from "../../components/track-list/track-list";

const Index = ({token, userId}) => {
    const router = useRouter()
    const {tracks, error} = useTypedSelector(state => state.track)
    if (error) {
        return (
            <MainLayout title={error}>
                <div className={classes.error}>
                    <h2>{error}</h2>
                </div>
            </MainLayout>
        )
    }
    return (
        <MainLayout title={'Треки'}>
            <div className={classes.tracks}>
                <div className={classes.tracks__top}>
                    <div className={classes.tracks__top__title}> Треки</div>
                    <div className={classes.tracks__top__createBtn}
                            onClick={() => router.push('/tracks/create')}>Загрузить
                    </div>
                </div>

                <TrackList tracks={tracks} token={token} user_id={userId}/>
            </div>
        </MainLayout>
    )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const session = await getSession({req: ctx.req})
    //const token= await getToken({req: ctx.req})
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    await dispatch(fetchTracks(session.accessToken))

    const player = cookies(ctx).player;
    const theme = cookies(ctx).theme;
    dispatch(setPlayer(player))
    dispatch({
        type: UsersActionTypes.HANDLE_CHANGE_DARK,
        payload: theme || false
    })
    return {
        props: {
            token: session.accessToken || null,
            userId: session.userId || null,
        }
    }
})
