import {useRouter} from 'next/router'
import classes from './[id].module.scss'
import {AlbumsAPI} from '../../api/albumsAPI'
import {useSession} from 'next-auth/client'
import {baseServerSideProps, wrapper} from '../../store'
import TrackList from "../../components/track-list/track-list";
import AlbumInfo from "../../components/album-info/album-info";
import AlbumComments from "../../components/album-comments/album-comments";
import MainLayout from "../../layouts/MainLayout";


const AlbumPage = ({album, token, userId}) => {
    const router = useRouter()
    const [session] = useSession() as any

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
                <TrackList tracks={album.tracks.data} token={token} user_id={userId} hideSearch={true}/>
                <AlbumComments album={album} session={session} token={token}/>
            </div>
        </MainLayout>
    )
}

export default AlbumPage

export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const session = await baseServerSideProps({ctx})
    const response = await AlbumsAPI.getOneAlbum(ctx.params.id, session.accessToken)
    return {
        props: {
            album: response.data,
            token: session.accessToken,
            userId: session.userId
        }

    }
})
