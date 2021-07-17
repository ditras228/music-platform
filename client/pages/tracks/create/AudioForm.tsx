import React from 'react'
import FileUpload from '../../../components/FileUpload'
import {Button} from '@material-ui/core'

const AudioForm = () => {
    return (
        <FileUpload setFile={setAudio} accept={'audio/*'}  formik={formik}>
            <Button>Загрузить аудио</Button>
        </FileUpload>
    )
}

export default AudioForm