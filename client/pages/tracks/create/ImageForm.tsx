import React from 'react'
import FileUpload from '../../../components/FileUpload'
import {Button, Grid} from '@material-ui/core'
import {FormStep} from './MultiStepForm'
import * as Yup from 'yup'
const ImageSchema = Yup.object({
    picture: Yup.string()
        .required('Обязательно'),
})

const ImageForm = ({setPicture, formik}) => {
    return (
        <FormStep stepName={'Обложка'}
                  validationSchema={ImageSchema}>
            <Grid container direction={'column'} style={{padding: 20, maxWidth: 900 }}>
                <FileUpload setFile={setPicture} accept={'image/*'} formik={formik}  >
                    <Button>Загрузить изображение</Button>
                </FileUpload>
            </Grid>
        </FormStep>
    )
}

export default ImageForm