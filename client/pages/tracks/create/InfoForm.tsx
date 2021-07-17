import React from 'react'
import {Grid, TextField} from '@material-ui/core'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {TracksAPI} from '../../../api/tracksAPI'
import MultiStepForm, {FormStep} from './MultiStepForm'
import InputField from './InputField'

const InfoSchema = Yup.object({
    name: Yup.string()
        .required('Обязательно'),
    artist: Yup.string()
        .required('Обязательно'),
    text: Yup.string()
        .required('Обязательно'),

})


const InfoForm = () => {

    return (
        <FormStep stepName={'Инфо'}
                  validationSchema={InfoSchema}>
            <Grid container direction={'column'} style={{padding: 20, maxWidth: 900 }}>
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
    )
}

export default InfoForm