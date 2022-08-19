import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useRouter} from 'next/router'
import {TracksAPI} from '../../api/tracksAPI'
import {ITrack} from '../../types/track'
import classes from './[id].module.scss'
import cookies from 'next-cookies'
import {setPlayer} from '../../store/action-creators/player'
import {NextThunkDispatch, wrapper} from '../../store'
import {getSession, useSession} from 'next-auth/client'
import {UsersActionTypes} from '../../types/user'
import TrackLyrics from "../../components/track-lyrics/track-lyrics";
import TrackComments from "../../components/track-comments/track-comments";
import TrackInfo from "../../components/track-info/track-info";


const TrackPage = ({serverTrack, token}) => {
    const router = useRouter()
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const [session, loading] = useSession() as any

    return (
        <MainLayout
            title={'Музыкальная площадка - ' + track.name + ' - ' + track.artist}
            keywords={'Музыка, артисты,' + track.name + track.artist}
        >
            <div className={classes.trackId}>
                <div
                    className={classes.trackId__title}
                    onClick={() => router.push('/tracks')}
                >
                    К списку
                </div>
                <TrackInfo track={track}></TrackInfo>
                <TrackLyrics lyrics={track.lyrics}></TrackLyrics>
                <TrackComments track={track} session={session} token={token}></TrackComments>
            </div>
        </MainLayout>
    )
}

export default TrackPage
export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const session = await getSession(ctx)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const player = cookies(ctx).player;
    dispatch(setPlayer(player))
    const theme = cookies(ctx).theme;
    dispatch({
        type: UsersActionTypes.HANDLE_CHANGE_DARK,
        payload: theme || false
    })

    const response = await TracksAPI.getOne(ctx.params.id, session.accessToken)
    return {
        props: {
            serverTrack: response.data,
            token: session.accessToken || null
        }

    }
})
