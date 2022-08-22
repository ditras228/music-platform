import {useRouter} from 'next/router'
import classes from './[id].module.scss'
import cookies from 'next-cookies'
import {IAlbum} from '../../types/album'
import {AlbumsAPI} from '../../api/albumsAPI'
import {getSession, useSession} from 'next-auth/client'
import {setPlayer,} from '../../store/action-creators/player'
import {NextThunkDispatch, wrapper} from '../../store'
import TrackList from "../../components/track-list/track-list";
import AlbumInfo from "../../components/album-info/album-info";
import AlbumComments from "../../components/album-comments/album-comments";
import {useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import {PlayerActionTypes} from "../../types/player";


const AlbumPage = ({serverAlbum, token, userId}) => {
    const router = useRouter()
    const [album, setAlbum] = useState<IAlbum>(serverAlbum)
    const [session, loading] = useSession() as any

    return (
        <MainLayout
            title={'Музыкальная площадка - ' + album.name + ' - ' + album.author}
            keywords={'Музыка, артисты,' + album.name + album.author}
        >
            <div className={classes.albumId}>
                <div
                    className={classes.albumId__title}
                    onClick={() => router.push('/albums')}
                >
                    К списку
                </div>
                <AlbumInfo album={album} token={token}/>
                <TrackList tracks={album.tracks} token={token} user_id={userId} hideSearch={true}/>
                <AlbumComments album={album} session={session} token={token}/>
            </div>
        </MainLayout>
    )
}

export default AlbumPage
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

    const response = await AlbumsAPI.getOneAlbum(ctx.params.id, session.accessToken)
    dispatch({type: PlayerActionTypes.SET_ACTIVE__ALBUM, payload: response.data})

    return {
        props: {
            serverAlbum: response.data,
            token: session.accessToken || null,
            userId: session.userId
        }

    }
})
