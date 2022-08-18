import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useRouter} from 'next/router'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {NextThunkDispatch, wrapper} from '../../store'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import classes from './index.module.scss'
import {fetchAlbums, searchAlbums} from '../../store/action-creators/album'
import {getSession} from 'next-auth/client'
import AlbumList from '../../components/album-list/album-list'
import cookies from 'next-cookies'
import {setPlayer} from '../../store/action-creators/player'
import {UsersActionTypes} from '../../types/user'

const Index = ({token, userId}) => {
    const router = useRouter()
    const {albums, error} = useTypedSelector(state => state.album)
    const [timer, setTimer] = useState(null)
    const dispatch = useDispatch()

    useFormik({
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
                await dispatch(searchAlbums(values, token))
            }, 500)
        )
    }

    if (error) {
        return (
            <MainLayout title={error}>
                <div className={classes.error}>
                    <button>
                        {/*<RotateLeft/>*/}
                    </button>
                    <h2>{error}</h2>
                </div>
            </MainLayout>
        )
    }
    return (
        <MainLayout title={'Альбомы'}>

            <div>
                <div className={classes.card}>
                    <div>
                        <h2 className={classes.title}>Альбомы</h2>
                        <button onClick={() => router.push('/albums/create')}>Новый альбом</button>
                    </div>
                    <AlbumList albums={albums} token={token} userId={userId}/>
                </div>
            </div>
        </MainLayout>
    )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
        const dispatch = ctx.store.dispatch as NextThunkDispatch
        const session = await getSession({req: ctx.req})

        if (!session) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }
        await dispatch(fetchAlbums(session.accessToken))
        const player = cookies(ctx).player;
        const theme = cookies(ctx).theme;
        dispatch( setPlayer(player))
        dispatch({
        type: UsersActionTypes.HANDLE_CHANGE_DARK,
        payload: theme || false
    })
        return {
            props: {
                token: session.accessToken || null,
                userId: session.userId || null
            }
        }
    }
)
