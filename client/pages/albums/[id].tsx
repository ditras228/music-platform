import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useRouter} from 'next/router'
import {baseURL} from '../../api'
import classes from './[id].module.scss'
import cookies from 'next-cookies'
import {IAlbum} from '../../types/album'
import {AlbumsAPI} from '../../api/albumsAPI'
import {getSession, useSession} from 'next-auth/client'
import CommentFC from '../../components/comment/comment'
import {useFormik} from 'formik'
import {setPlayer} from '../../store/action-creators/player'
import {NextThunkDispatch, wrapper} from '../../store'
import {UsersActionTypes} from '../../types/user'
import * as yup from 'yup'
import TrackList from "../../components/track-list/track-list";
import Image from "next/image";
import AlbumInfo from "../../components/album-info/album-info";
import TrackComments from "../../components/track-comments/track-comments";
import AlbumComments from "../../components/album-comments/album-comments";
import TrackInfo from "../../components/track-info/track-info";
import TrackLyrics from "../../components/track-lyrics/track-lyrics";

const commentSchema = yup.object({
    text: yup.string()
        .min(1, 'Минимум 1 символ')
        .max(2000, 'Максимум 200 символов')
        .required()
})

const AlbumPage = ({serverAlbum, token, userId}) => {
    const router = useRouter()
    const [album, setAlbum] = useState<IAlbum>(serverAlbum)
    const [session, loading] = useSession() as any

    const formik = useFormik({
        initialValues: {
            text: '',
            album_id: album.id
        },
        validationSchema: commentSchema,
        onSubmit: async values => {
            AlbumsAPI.addComment(values, token).then((comment: any) =>
                setAlbum({...album, comments: [comment.data, ...album.comments]})
            )
        }
    })
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
                <AlbumInfo album={album}/>
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

    return {
        props: {
            serverAlbum: response.data,
            token: session.accessToken || null,
            userId: session.userId
        }

    }
})
