// In my bundle config this is setup to export to window.WaveSurfer
import dynamic from 'next/dynamic'
if (typeof window !== "undefined") {
    var WaveSurfer = require('wavesurfer.js');
}

import React, {useEffect, useRef, useState} from 'react'
import {wrapper} from '../../store'
import {getSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import MultiStepForm, {FormStep} from './create/MultiStepForm'
import {Button, Grid} from '@material-ui/core'
import InputField from './create/InputField'
import * as Yup from 'yup'
import FileUpload from '../../components/FileUpload'
import classes from './index.module.css'
import {TracksAPI} from '../../api/tracksAPI'

const InfoSchema = Yup.object({
    name: Yup.string()
        .required('Обязательно'),
    artist: Yup.string()
        .required('Обязательно'),
    text: Yup.string()
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
    const [image, setImage] = useState('http://placehold.it/100')
    const [audio, setAudio] = useState('none')
    const router = useRouter()
    const chart = useRef(null);
    useEffect(()=>{
        chart.current.innerHTML = "";

        if (process.browser) {
            var wavesurfer = WaveSurfer.create({
                container: '#waveform',
                waveColor: 'violet',
                progressColor: 'purple'
            });
            wavesurfer.load(audio);
        }
    },[audio])

    return (
        <MultiStepForm
            initialValues={{
                name: '',
                artist: '',
                text: '',
                picture: undefined,
                audio: undefined

            }}

            onSubmit={(values)   => {
                 TracksAPI.createTrack(values, token)
                     .finally(()=> router.push('/tracks'))
        }}
        >
            <FormStep stepName={'Аудио'}
                      validationSchema={AudioSchema}>
                <FileUpload  accept={'audio/*'} name={'audio'} setAudio={setAudio}>
                    <Button>Загрузить аудио</Button>
                </FileUpload>
                <div id="waveform" ref={chart}/>
            </FormStep>

            <FormStep stepName={'Инфо'}
                      validationSchema={InfoSchema}>
                <Grid container direction={'column'} style={{padding: 20, maxWidth: 900}}>
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
                        //multiline
                        //rows={3}
                    />
                </Grid>
            </FormStep>

            <FormStep stepName={'Обложка'}
                      validationSchema={ImageSchema}>
                <Grid container direction={'column'} style={{padding: 20, maxWidth: 900}}>
                    <FileUpload accept={'image/*'} name={'picture'} setImage={setImage}>
                        <Button>Загрузить изображение</Button>
                    </FileUpload>
                    <img className={classes.image} src={image} alt=""/>
                </Grid>

            </FormStep>

           


        </MultiStepForm>
    )
}

export default Create
export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const session = await getSession({req: ctx.req})
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
