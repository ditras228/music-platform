import ImagePreview from '../../ui/image-preview/image-preview'
import React, {useEffect, useRef, useState} from 'react'
import {NextThunkDispatch, wrapper} from '../../store'
import {getSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import * as Yup from 'yup'
import MainLayout from '../../layouts/MainLayout'
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {CreateAlbum} from '../../store/action-creators/user'
import MultiStepForm, {FormStep} from '../../ui/step-form/multi-step-form'
import {fetchTracks} from '../../store/action-creators/track'
import {setPlayer} from '../../store/action-creators/player'
import cookies from 'next-cookies'
import {UsersActionTypes} from '../../types/user'
import AlertStep from '../../ui/step-form/alert-step'
import TrackList from "../../components/track-list/track-list";
import FileUpload from "../../ui/file-upload/file-upload";
import InputField from "../../ui/input-field/input-field";
import classes from './create.module.scss'

const InfoSchema = Yup.object({
    name: Yup.string()
        .required('Обязательно'),
    author: Yup.string()
        .required('Обязательно'),
})
const ImageSchema = Yup.object().shape({
    picture: Yup.mixed()
        .required('Обязательно')
        .nullable()
        .test({
            message: "Должна быть квардатной",
            test: img => img?.width === img?.height
        })
})

const TrackSchema = Yup.object().shape({
    tracks: Yup.array()
        .nullable()
        .test({
                message: 'Минимум 3',
                test: arr => arr.length >= 3
            }
        )
})

const Create = ({token, userId}) => {
    const [image, setImage] = useState('')
    const router = useRouter()
    const redirectTo = useTypedSelector(state => state.user.redirectTo)
    const {tracks, error} = useTypedSelector(state => state.track)
    const dispatch = useDispatch()
    const previewCanvasRef = useRef(null);

    useEffect(() => {
        if (redirectTo)
            router.push(`/albums/${redirectTo}`)
    }, [redirectTo, router])

    return (
        <MainLayout title={'Создать альбом'}>
            <div>
                <MultiStepForm
                    initialValues={{
                        name: '',
                        artist: '',
                        image: undefined,
                        tracks: [] as Array<string>
                    }}

                    onSubmit={(values) => {
                        dispatch(CreateAlbum({
                            ...values,
                            tracks: JSON.stringify(values['tracks'])
                        }, token))
                    }}
                >
                    <FormStep stepName={'Инфо'}
                              validationSchema={InfoSchema}>
                        <div
                            className={classes.createAlbumContent__info}>
                            <InputField
                                name={'name'}
                                label={'Название альбома'}
                            />
                            <InputField
                                name={'author'}
                                label={'Имя автора'}
                            />
                        </div>
                    </FormStep>

                    <FormStep stepName={'Обложка'}
                              validationSchema={ImageSchema}>
                        <AlertStep/>
                        <div>
                            <FileUpload accept={'image/*'} name={'picture'} setImage={setImage}/>
                        </div>

                        <ImagePreview src={image} previewCanvasRef={previewCanvasRef}/>
                    </FormStep>

                    <FormStep stepName={'Треки'}
                              validationSchema={TrackSchema}
                    >
                        <div className={classes.createAlbumContent__tracksTitle}>Выберите 3+ треков</div>
                        <TrackList tracks={tracks} token={token} user_id={userId} view={'checkbox'}/>
                    </FormStep>
                </MultiStepForm>
            </div>

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
    const player = cookies(ctx).player

    dispatch(setPlayer(player))

    return {
        props: {
            userId: session.id || null,
            token: session.accessToken || null,
        }
    }
})
