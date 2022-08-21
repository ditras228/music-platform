import ImagePreview from '../../ui/image-preview/image-preview'
import React, {useEffect, useRef, useState} from 'react'
import {NextThunkDispatch, wrapper} from '../../store'
import {getSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import MultiStepForm, {FormStep} from '../../ui/step-form/multi-step-form'
import InputField from '../../ui/input-field/input-field'
import * as Yup from 'yup'
import classes from './create.module.scss'
import MainLayout from '../../layouts/MainLayout'
import {UsersActionTypes} from '../../types/user'
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {CreateTrack} from '../../store/action-creators/user'
import cookies from 'next-cookies'
import {setPlayer} from '../../store/action-creators/player'
import FileUpload, {fileFormats} from '../../ui/file-upload/file-upload'

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
        if (redirectTo) {
            router.push(`/tracks/${redirectTo}`)
        }
    }, [redirectTo, router])

    useEffect(() => {
        if (chart.current)
            chart.current.innerHTML = ''

        if (typeof window !== 'undefined' && audio !=null) {
            const wavesurfer = WaveSurfer.create({
                container: chart.current,
                barWidth: 3,
                cursorWidth: 0,
                height: 80,
                responsive: true,
                waveColor: '#007acc',
                progressColor: '#007acc',
            })
            wavesurfer.load(audio)
        }
    }, [audio])

    return (
        <MainLayout title={'Загрузить трек'}>
            <>
                <div ref={chart} className={classes.waveSuffer}/>
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
                        <FileUpload accept={fileFormats.AUDIO} name={'audio'} setAudio={setAudio}/>
                    </FormStep>

                    <FormStep stepName={'Инфо'}
                              validationSchema={InfoSchema}>
                        <div className={classes.createContent__info}>
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
                        </div>
                    </FormStep>

                    <FormStep stepName={'Обложка'}
                              validationSchema={ImageSchema}
                    >
                        <div>
                            <FileUpload accept={'image/*'} name={'picture'} setImage={setImage}>
                                <button className={classes.createContent__btn}>Загрузить изображение</button>
                            </FileUpload>
                        </div>
                        <ImagePreview src={image} previewCanvasRef={previewCanvasRef}/>
                    </FormStep>

                </MultiStepForm>
            </>

        </MainLayout>
    )
}

export default Create
export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const session = await getSession({req: ctx.req})
    const player = cookies(ctx).player;

    dispatch(setPlayer(player))

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
