import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import StepWrapper from '../../components/StepWrapper'
import {Box, Button, Grid, TextField} from '@material-ui/core'
import FileUpload from '../../components/FileUpload'
import {useFormik} from 'formik'
import {TracksAPI} from '../../api/tracksAPI'
import {NextThunkDispatch, wrapper} from '../../store'
import cookies from 'next-cookies'
import {Auth} from '../../store/action-creators/user'
import {useRouter} from 'next/router'
import {fetchTracks} from '../../store/action-creators/track'
import TrackList from '../../components/TrackList'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import * as Yup from 'yup'
import {Alert} from '@material-ui/lab'
import classes from '../../components/TrackList.module.css'
import TrackItem from '../../components/TrackItem'
import {AlbumsAPI} from '../../api/albumsAPI'

const SignupSchema = Yup.object({
    name: Yup.string()
        .required('Обязательно'),
    artist: Yup.string()
        .required('Обязательно'),
    text: Yup.string()
        .required('Обязательно'),

})
const Create = ({token}) => {
    const router = useRouter();
    const [activeStep, setActiveState] = useState(0)
    const [picture, setPicture] = useState(null)
    const {tracks,  albumTracks} = useTypedSelector(state => state.track)

    const back = () => {
        setActiveState(prevState => prevState - 1)
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            artist: '',
            text: '',
            picture : picture,
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
                if (activeStep !== 2) {
                    setActiveState(prevState => prevState + 1)
                } else {
                    AlbumsAPI.createAlbum({values, albumTracks: albumTracks.map(album=> album._id)}, token)
                        .then(() => router.push('/albums'))
            }
        }
    })
    return (
        <MainLayout >
            <StepWrapper steps={ ['Инфо', 'Обложка', 'Треки']} activeStep={activeStep} >
                {activeStep === 0 &&
                <form onSubmit={formik.handleSubmit}>

                <Grid container direction={'column'}>
                        <TextField
                            name={'name'}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            style={{marginTop: 10}}
                            label={'Название альбома'}

                        />
                    {formik.errors.name
                    && <Alert variant="filled" severity="error">
                        {formik.errors.name}
                    </Alert>}

                    <TextField
                            name={'artist'}
                            value={formik.values.artist}
                            onChange={formik.handleChange}
                            style={{marginTop: 10}}
                            label={'Автор'}
                        />
                    {formik.errors.artist
                    && <Alert variant="filled" severity="error">
                        {formik.errors.artist}
                    </Alert>}
                    <TextField
                        name={'text'}
                        value={formik.values.text}
                        onChange={formik.handleChange}
                        style={{marginTop: 10}}
                        label={'Описание'}

                    />
                    {formik.errors.text
                    && <Alert variant="filled" severity="error">
                        {formik.errors.text}
                    </Alert>}

                </Grid>
                </form>

                }
                {activeStep === 1 &&
                <FileUpload setFile={setPicture} accept={'image/*'} formik={formik}  >
                    <Button>Загрузить изображение</Button>
                </FileUpload>
                }
                {activeStep === 2 &&
                    <>
                        <Grid container direction={'column'} >
                            <Box p={0} className={classes.box}>
                                {albumTracks.map(track=>
                                    <TrackItem
                                        key={track._id}
                                        track={track}
                                        token={token}
                                        view={'create'}
                                    />
                                )}
                            </Box>
                        </Grid>
                        <TrackList tracks={tracks} token={token}/>
                    </>
                }
            </StepWrapper>
            <Grid container justify={'space-between'}>
                <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                <Button onClick={()=>                    formik.handleSubmit()
                }>Далее</Button>
            </Grid>
        </MainLayout>
    )
}

export default Create
export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const token = cookies(ctx).token;
    console.log(token)
    await dispatch( Auth())
    await dispatch( fetchTracks(token))
    return{
        props: {
            token: token
        }
    }
})
