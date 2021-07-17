import React from 'react'
import {TracksAPI} from '../../api/tracksAPI'
import {wrapper} from '../../store'
import {getSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import InfoForm from './create/InfoForm'
import ImageForm from './create/ImageForm'
import AudioForm from './create/AudioForm'
import MultiStepForm from './create/MultiStepForm'


const Create = ({token}) => {
    const router = useRouter()
    return (
        <MultiStepForm
            initialValues={{
                name: '',
                artist: '',
                text: '',
                picture: null,
                audio: null
            }}
            onSubmit={(values => {
                TracksAPI.createTrack(values, token).then(() => router.push('/tracks'))
            })}
        >
            <InfoForm/>
            <ImageForm/>
            <AudioForm/>

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
