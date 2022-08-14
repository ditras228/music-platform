import ImagePreview from '../../components/ImagePreview/ImagePreview'
import React, {useEffect, useRef, useState} from 'react'
import {NextThunkDispatch, wrapper} from '../../store'
import {getSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import MultiStepForm, {FormStep} from '../../components/StepForm/MultiStepForm'
import {Button, Card, Grid} from '@material-ui/core'
import InputField from '../../components/StepForm/InputField'
import * as Yup from 'yup'
import MainLayout from '../../layouts/MainLayout'
import {UsersActionTypes} from '../../types/user'
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {CreateTrack} from '../../store/action-creators/user'
import cookies from 'next-cookies'
import {setPlayer} from '../../store/action-creators/player'
import FileUpload from '../../components/FileUpload/FileUpload'

if (typeof window !== 'undefined') {
    var WaveSurfer = require('wavesurfer.js')
}

const InfoSchema = Yup.object({
    name: Yup.string()
        .required('Обязательно'),
    artist: Yup.string()
        .required('Обязательно'),
})
const ImageSchema = Yup.object().shape({
    picture: Yup.mixed().required('Обязательно')
})

const AudioSchema = Yup.object({
    audio: Yup.mixed()
        .required('Обязательно'),
})

const Create = ({token}) => {
    const [image, setImage] = useState('')
    const [audio, setAudio] = useState('none')
    const router = useRouter()
    const chart = useRef(null)
    const previewCanvasRef = useRef(null);
    const redirectTo = useTypedSelector(state => state.user.redirectTo)
    const dispatch = useDispatch()

    useEffect(() => {
        if (redirectTo){
            router.push(`/tracks/${redirectTo}`)
        }
    }, [redirectTo])

    useEffect(() => {
        if (chart.current)
            chart.current.innerHTML = ''

        if (typeof window !== 'undefined') {
            const wavesurfer = WaveSurfer.create({
                container: chart.current,
                waveColor: '#3f51b5',
            })
            wavesurfer.load(audio)
        }
    }, [audio])

    return (
        <MainLayout title={'Загрузить трек'}>
            <Card>

                <MultiStepForm
                    initialValues={{
                        name: '',
                        artist: '',
                        lyrics: '',
                        picture: undefined,
                        audio: undefined

                    }}

                    onSubmit={(values) => {
                        dispatch(CreateTrack(values, token))
                    }}
                >
                    <FormStep stepName={'Аудио'}
                              validationSchema={AudioSchema}>
                        <FileUpload accept={'audio/*'} name={'audio'} setAudio={setAudio}>
                            <Button fullWidth>Загрузить аудио</Button>
                        </FileUpload>
                        <div ref={chart}/>
                    </FormStep>

                    <FormStep stepName={'Инфо'}
                              validationSchema={InfoSchema}>
                        <Grid container direction={'column'}
                              style={{padding: 20, maxWidth: 900, margin: '0 auto'}}>
                            <InputField
                                name={'name'}
                                label={'Название трека'}
                            />
                            <InputField
                                name={'artist'}
                                label={'Имя исполнителя'}
                            />
                            <InputField
                                name={'text'}
                                label={'Слова к треку'}
                                multiline
                                rows={15}
                            />
                        </Grid>
                    </FormStep>

                    <FormStep stepName={'Обложка'}
                              validationSchema={ImageSchema}
                    >
                        <Grid container direction={'column'}>
                            <FileUpload accept={'image/*'} name={'picture'} setImage={setImage}>
                                <Button fullWidth>Загрузить изображение</Button>
                            </FileUpload>
                        </Grid>
                        <ImagePreview src={image} previewCanvasRef={previewCanvasRef}/>
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
    const theme = cookies(ctx).theme;
    const player = cookies(ctx).player;

    dispatch(setPlayer(player))
    dispatch({
        type: UsersActionTypes.HANDLE_CHANGE_DARK,
        payload: theme || false
    })
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {
            token: session.accessToken || null,
        }
    }
})
