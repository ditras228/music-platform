import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Button, Card, Grid} from '@material-ui/core'
import {useRouter} from 'next/router'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {NextThunkDispatch, wrapper} from '../../store'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {RotateLeft, Search} from '@material-ui/icons'
import classes from './index.module.css'
import {fetchAlbums, searchAlbums} from '../../store/action-creators/album'
import {getSession} from 'next-auth/client'
import AlbumList from '../../components/AlbumList'
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
        <MainLayout title={'Альбомы'}>

            <Grid container justify={'center'}>
                <Card className={classes.card}>
                    <Grid container justify={'space-between'} direction={'row'}>
                        <h2 className={classes.title}><Search/>Список альбомов</h2>
                        <Button onClick={() => router.push('/albums/create')}>Новый альбом</Button>
                    </Grid>
                    <AlbumList albums={albums} token={token} userId={userId}/>
                </Card>
            </Grid>
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
                token: session.accessToken,
                userId: session.userId
            }
        }
    }
)
