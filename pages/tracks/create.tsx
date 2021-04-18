import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import StepWrapper from '../../components/StepWrapper'
import {Button, Grid} from '@material-ui/core'
import FileUpload from '../../components/FileUpload'

const Create = () => {
    const [activeStep, setActiveState] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const next = () => {
        if (activeStep !== 2) {
            setActiveState(prevState => prevState + 1)

        }
    }

    const back = () => {
        setActiveState(prevState => prevState - 1)

    }
    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                <h1>Create track</h1>
                }
                {activeStep === 1 &&
                <FileUpload setFile={setPicture} accept={'image/*'}>
                    <Button>Загрузить изображение</Button>
                </FileUpload>
                }
                {activeStep === 2 &&
                <FileUpload setFile={setAudio} accept={'audio/*'}>
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