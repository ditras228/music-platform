import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useRouter} from 'next/router'
import {TracksAPI} from '../../api/tracksAPI'
import {imagesURL} from '../../api'
import {useFormik} from 'formik'
import {ITrack} from '../../types/track'
import classes from './[id].module.scss'
import cookies from 'next-cookies'
import CommentFC from '../../components/comment/comment'
import {setPlayer} from '../../store/action-creators/player'
import {NextThunkDispatch, wrapper} from '../../store'
import {getSession, useSession} from 'next-auth/client'
import {UsersActionTypes} from '../../types/user'
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {PlayerActionTypes} from "../../types/player";
import Image from "next/image";

const commentSchema = yup.object({
    text: yup.string()
        .min(1, 'Минимум 1 символ')
        .max(2000, 'Максимум 200 символов')
        .required()
})

const TrackPage = ({serverTrack, token}) => {
    const router = useRouter()
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const [ session, loading ] = useSession() as any
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            text: '',
            track_id: serverTrack.id
        },
        validationSchema: commentSchema,
        onSubmit: async values => {
            TracksAPI.addComment(values, token).then((comment: any) => {
                console.log(comment)
                console.log(comment.data)
                    setTrack({...track, comments: [comment.data, ...track.comments]})

                }
            )
        }
    })
    const trackClickHandler = () => {
        dispatch({
            type: PlayerActionTypes.SET_ACTIVE,
            payload: serverTrack
        })
    }
    return (
        <MainLayout
            title={'Музыкальная площадка - ' + track.name + ' - ' + track.artist}
            keywords={'Музыка, артисты,' + track.name + track.artist}
        >
            <div className={classes.grid}>
                <div
                    style={{fontSize: 20}}
                    onClick={() => router.push('/tracks')}
                >
                     К списку
                </div>
                <div>

                    <div className={classes.info}>
                        <div className={classes.img_thumb}>
                            <Image width={170} height={170} src={imagesURL + track.image}
                                 className={classes.img} alt={'Обложка трека'} onClick={trackClickHandler}/>
                            <div className={classes.play_button}/>
                        </div>
                        <div style={{marginLeft: '30px'}}>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}>Название</h3>
                                <h3 className={classes.item_value}>{track.name}</h3>
                            </div>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}>Автор</h3>
                                <h3 className={classes.item_value}>{track.artist}</h3>
                            </div>
                            <div className={classes.line}>
                                <h3 className={classes.item_title}>Прослушиваний</h3>
                                <h3 className={classes.item_value}>{track.listens}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        track.lyrics&&(
                            <div  className={classes.card}>
                                <div className={classes.card}>
                                    <h3 className={classes.title}>Слова к песне</h3>
                                    <pre>{track.lyrics}</pre>
                                </div>
                            </div>
                        )
                    }

                    <div  className={classes.card}>
                        <form onSubmit={formik.handleSubmit} className={classes.form}>
                            <h3 className={classes.title}>
                                {
                                track.comments.length === 0
                                    ? 'нет комментариев'
                                    : 'комментарии'
                            }
                            </h3>
                            {session && (
                                <div className={classes.comments_form}>
                                    <div className={classes.avatar_comment}>
                                        {/*<Avatar alt="Remy Sharp" src={session.image}*/}
                                        {/*        style={{backgroundColor: session.color || 'gray', marginRight: 20}}>*/}
                                        {/*    {session.user?.name?.substring(0, 1)}*/}
                                        {/*</Avatar>*/}
                                        <input
                                            value={formik.values.text}
                                            onChange={formik.handleChange}
                                            name={'text'}
                                        >
                                        </input>
                                    </div>
                                    {formik.errors.text && formik.touched.text &&
                                    <div>
                                        {formik.errors.text}
                                    </div>}
                                    <button
                                        type={'submit'}
                                        className={classes.comments_submit}
                                    >Отправить
                                    </button>

                                </div>
                            )}
                        </form>
                    </div>

                    {
                        track.comments.map((comment: any) =>
                            <CommentFC key={comment.id} comment={comment}/>
                        )
                    }
                </div>

            </div>
        </MainLayout>
    )
}

export default TrackPage
export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const session = await getSession(ctx)

    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const player = cookies(ctx).player;
    dispatch( setPlayer(player))
    const theme = cookies(ctx).theme;
    dispatch({
        type: UsersActionTypes.HANDLE_CHANGE_DARK,
        payload: theme || false
    })

    const response = await TracksAPI.getOne(ctx.params.id, session.accessToken)
    return {
        props: {
            serverTrack: response.data,
            token: session.accessToken || null
        }

    }
})
