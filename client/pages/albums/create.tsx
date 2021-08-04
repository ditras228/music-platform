import ImagePreview from '../../components/ImagePreview'
import React, {useEffect, useRef, useState} from 'react'
import {NextThunkDispatch, wrapper} from '../../store'
import {getSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import {Button, Card, Grid} from '@material-ui/core'
import * as Yup from 'yup'
import FileUpload from '../../components/FileUpload'
import MainLayout from '../../layouts/MainLayout'
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {CreateAlbum} from '../../store/action-creators/user'
import MultiStepForm, {FormStep} from '../../components/create/MultiStepForm'
import InputField from '../../components/create/InputField'
import TrackList from '../../components/TrackList'
import {fetchTracks} from '../../store/action-creators/track'
import {setPlayer} from '../../store/action-creators/player'
import {useFormikContext} from 'formik'
import cookies from 'next-cookies'
import {UsersActionTypes} from '../../types/user'

const InfoSchema = Yup.object({
    name: Yup.string()
        .required('Обязательно'),
    artist: Yup.string()
        .required('Обязательно'),
})
const ImageSchema = Yup.object().shape({
    picture: Yup.mixed().required('Обязательно')
})

const TrackSchema = Yup.object().shape({
    tracks: Yup.array()
        .test({
            message:'Минимум 2, максимум 16',
            test: arr  => arr.length >= 2
        }

        )
})

const Create = ({token, userId}) => {
    const [image, setImage] = useState('http://placehold.it/100')
    const router = useRouter()
    const redirectTo = useTypedSelector(state => state.user.redirectTo)
    const {tracks, error} = useTypedSelector(state => state.track)
    const dispatch = useDispatch()
    const albumTracks = useTypedSelector(state => state.album.albumTracks)

    useEffect(()=>{
        console.log(albumTracks)
    },[albumTracks])
    useEffect(() => {
        if (redirectTo)
            router.push(`/albums/${redirectTo}`)
    }, [redirectTo])
    return (
        <MainLayout title={'Создать альбом'}>
            <Card>
                <MultiStepForm
                    initialValues={{
                        name: '',
                        artist: '',
                        picture: undefined,
                        tracks: []
                    }}

                    onSubmit={(values) => {
                        dispatch(CreateAlbum({...values, tracks: JSON.stringify(albumTracks.map(track=>track._id))}, token))
                    }}
                >
                    <FormStep stepName={'Инфо'}
                              validationSchema={InfoSchema}>
                        <Grid container direction={'column'}
                              style={{padding: 20, maxWidth: 900, margin: '0 auto'}}>
                            <InputField
                                name={'name'}
                                label={'Название альбома'}
                            />
                            <InputField
                                name={'artist'}
                                label={'Имя автора'}
                            />
                        </Grid>
                    </FormStep>

                    <FormStep stepName={'Обложка'}
                              validationSchema={ImageSchema}>
                        <Grid container direction={'column'}>
                            <FileUpload accept={'image/*'} name={'picture'} setImage={setImage}>
                                <Button fullWidth>Загрузить изображение</Button>
                            </FileUpload>
                        </Grid>
                        <ImagePreview src={image}/>
                    </FormStep>

                    <FormStep stepName={'Треки'}
                              validationSchema={TrackSchema}>
                        <div style={{padding: '0 40px'}}>
                            
                            <TrackList tracks={tracks} token={token} userId={userId} view={'checkbox'}/>
                        </div>
                    </FormStep>
                </MultiStepForm>
            </Card>

        </MainLayout>
    )
}

export default Create
export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const session = await getSession({req: ctx.req})
    await dispatch(fetchTracks(session.accessToken))
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const player = cookies(ctx).player;
    const theme = cookies(ctx).theme;

    dispatch( setPlayer(player))
    dispatch({
        type: UsersActionTypes.HANDLE_CHANGE_DARK,
        payload: theme || false
    })
    return {
        props: {
            userId: session.id || null,
            token: session.accessToken || null,
        }
    }
})
