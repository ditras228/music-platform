import React from 'react'
import {wrapper} from '../../store'
import {getSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import MultiStepForm, {FormStep} from './create/MultiStepForm'
import {Button, Grid} from '@material-ui/core'
import InputField from './create/InputField'
import * as Yup from 'yup'
import FileUpload from '../../components/FileUpload'
import {useFormik} from 'formik'

const InfoSchema = Yup.object({
    name: Yup.string()
        .required('Обязательно'),
    artist: Yup.string()
        .required('Обязательно'),
    text: Yup.string()
        .required('Обязательно'),

})
const ImageSchema = Yup.object({
    picture: Yup.mixed()
        .required('Обязательно') .test(
            "fileSize",
            "Your video is too big :(",
            value => value && value.size <= 262144000
        )
})

const AudioSchema = Yup.object({
    audio: Yup.mixed()
        .required('Обязательно'),
})

const Create = ({token}) => {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            name: '',
            artist: '',
            text: '',
            picture: undefined,
            audio: undefined

        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    })
    return (
        <MultiStepForm
            initialValues={formik.initialValues}
            onSubmit={formik.submitForm}
        >
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
                    <FileUpload accept={'image/*'} formik={formik}>
                        <Button>Загрузить изображение</Button>
                        {formik.errors.picture ?
                            <div>formik.errors.picture</div> : ""}
                    </FileUpload>
                </Grid>
            </FormStep>
            <FormStep stepName={'Аудио'}
                      validationSchema={AudioSchema}>
                <FileUpload  accept={'audio/*'} formik={formik}>
                    <Button>Загрузить аудио</Button>
                </FileUpload>
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
