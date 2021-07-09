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

const Index = ({token}) => {
    const router = useRouter()
    const {albums,  error} = useTypedSelector(state => state.album)
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
                                <Button onClick={() => router.push('/album/create')}>Новый альбом</Button>
                        </Grid>
                    <AlbumList albums={albums} token={token}/>
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const session= await getSession(ctx)

    if(!session){
        ctx.res.writeHead(307, {location: '/'})
        ctx.res.end()
        return({props:{}})
    }

    await dispatch( fetchAlbums(session.accessToken))
    return{
        token: session.accessToken
    }
})
