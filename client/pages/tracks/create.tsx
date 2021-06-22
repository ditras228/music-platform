import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import StepWrapper from '../../components/StepWrapper'
import {Button, Grid, TextField} from '@material-ui/core'
import FileUpload from '../../components/FileUpload'
import {useFormik} from 'formik'
import {TracksAPI} from '../../api/tracksAPI'
import {router} from 'next/client'
import {NextThunkDispatch, wrapper} from '../../store'
import cookies from 'next-cookies'
import {Auth} from '../../store/action-creators/user'
let token

const Create = () => {
    const [activeStep, setActiveState] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)

        const next = () => {
        if (activeStep !== 2) {
            setActiveState(prevState => prevState + 1)
        } else {
            formik.handleSubmit()
        }
    }
    const back = () => {
        setActiveState(prevState => prevState - 1)
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            artist: '',
            text: '',
            picture : picture,
            audio: audio
        },
        onSubmit: values => {
           TracksAPI.createTrack(values, token).then(() => router.push('/tracks'))
        }
    })
    return (
        <MainLayout>
            <StepWrapper steps={ ['Инфо', 'Обложка', 'Аудио']} activeStep={activeStep}>
                {activeStep === 0 &&
                <form onSubmit={formik.handleSubmit}>

                <Grid container direction={'column'} style={{padding: 20, maxWidth: 900 }}>
                        <TextField
                            name={'name'}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            style={{marginTop: 10}}
                            label={'Название трека'}

                        />
                        <TextField
                            name={'artist'}
                            value={formik.values.artist}
                            onChange={formik.handleChange}
                            style={{marginTop: 10}}
                            label={'Имя исполнителя'}
                        />
                        <TextField
                            name={'text'}
                            value={formik.values.text}
                            onChange={formik.handleChange}
                            style={{marginTop: 10}}
                            label={'Слова к треку'}
                            multiline
                            rows={3}
                        />
                </Grid>
                </form>

                }
                {activeStep === 1 &&
                <FileUpload setFile={setPicture} accept={'image/*'} formik={formik}  >
                    <Button>Загрузить изображение</Button>
                </FileUpload>
                }
                {activeStep === 2 &&
                <FileUpload setFile={setAudio} accept={'audio/*'}  formik={formik}>
                    <Button>Загрузить аудио</Button>
                </FileUpload>
                }
            </StepWrapper>
            <Grid container justify={'space-between'}>
                <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                <Button onClick={next}>Далее</Button>
            </Grid>
        </MainLayout>
    )
}

export default Create
export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    token = cookies(ctx).token;
    await dispatch( Auth(token))

})
