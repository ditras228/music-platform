import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useFormik} from 'formik'
import {useRouter} from 'next/router'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {GetError} from '../../store/selectors'
import {getCsrfToken, getSession, signIn} from 'next-auth/client'
import {UsersActionTypes} from '../../types/user'
import {NextThunkDispatch, wrapper} from '../../store'
import cookies from 'next-cookies'
import classes from './index.module.scss'

const SignupSchema = Yup.object({
    email: Yup.string().email('Неккоректный email').required('Обязательно'),
    password: Yup.string()
        .min(6, 'Должен быть больше 5 символов')
        .max(16, 'Должен быть меньше 17 символов')
        .required('Обязательно'),
})

const LogIn = ({session, csrfToken}) => {
    const router = useRouter()
    const error = useSelector(state => GetError(state, 'login'))
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: async values => {

        }
    })
    const loginHandler = async (e: any) => {
        e.preventDefault()
        await router.push('/auth/register')
    }
    const handleSignIn=async (data)=>{
        if(typeof data.error === 'string'){
            dispatch({
                type: UsersActionTypes.ADD_ERROR,
                payload: {type: 'login', message: data.error}
            })
        }else{
           await router.push('/tracks')
        }
    }
    return (
        <MainLayout>
            <form >
                <div
                    className={classes.login}>
                    <h2 className={classes.login__title}>Вход</h2>
                    <div
                        className={classes.form}
                    >
                        <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
                        <input
                            name={'email'}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.email && formik.errors.email
                        && <div>
                            {formik.errors.email}
                        </div>}
                        <input
                            name={'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type={'password'}

                        />
                        {formik.touched.password && formik.errors.password
                        && <div>
                            {formik.errors.password}
                        </div>}
                        {error ?
                            <div>
                                {error.message}
                            </div> : null}

                        <button
                            onClick={() => {
                                formik.handleSubmit()
                                signIn('credentials',
                                    {email: formik.values.email, password: formik.values.password, redirect: false})
                                    .then(data => handleSignIn(data))
                            }                                }>
                            Войти
                        </button>
                        <button
                            onClick={() => signIn('github')}>
                            Войти с помощью GitHub
                        </button>
                        <div onClick={e => loginHandler(e)} className={classes.login}>
                            Ещё нет аккаунта? Зарегистрируйтесь
                        </div>
                    </div>
                </div>
            </form>
        </MainLayout>
    )
}

export default LogIn


export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const theme = cookies(ctx).theme;
    const session = await getSession({req: ctx.req})
    const csrfToken= await getCsrfToken(ctx)
    dispatch({
        type: UsersActionTypes.HANDLE_CHANGE_DARK,
        payload: theme || false
    })
    if (session?.accessToken) {
        return {
            redirect: {
                destination: '/tracks',
                permanent: false,
            },
        }
    }

    return ({props: {session, csrfToken}})

})
