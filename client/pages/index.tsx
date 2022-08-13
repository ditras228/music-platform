import React from 'react'
import MainLayout from '../layouts/MainLayout'
import {useFormik} from 'formik'
import {Button, Card, Grid, Link, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import * as Yup from 'yup'
import {GitHub, VpnKey} from '@material-ui/icons'
import classes from './auth/register.module.css'
import {Alert} from '@material-ui/lab'
import {useDispatch, useSelector} from 'react-redux'
import {GetError} from '../store/selectors'
import {getCsrfToken, getSession, signIn} from 'next-auth/client'
import {UsersActionTypes} from '../types/user'
import {NextThunkDispatch, wrapper} from '../store'
import cookies from 'next-cookies'

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
                <Card
                    className={classes.card}>
                    <h2 className={classes.title}><VpnKey/> Вход</h2>
                    <Grid
                        className={classes.form}
                    >
                        <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
                        <TextField
                            label={'Введите Email'}
                            name={'email'}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.email && formik.errors.email
                        && <Alert variant="filled" severity="error">
                            {formik.errors.email}
                        </Alert>}
                        <TextField
                            label={'Введите пороль'}
                            name={'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type={'password'}

                        />
                        {formik.touched.password && formik.errors.password
                        && <Alert variant="filled" severity="error">
                            {formik.errors.password}
                        </Alert>}
                        {error ?
                            <Alert variant="filled" severity="error">
                                {error.message}
                            </Alert> : null}

                        <Button
                            //type={'submit'}
                            onClick={() => {
                                formik.handleSubmit()
                                signIn('credentials',
                                    {email: formik.values.email, password: formik.values.password, redirect: false})
                                    .then(data => handleSignIn(data))
                            }                                }>
                            Войти
                        </Button>
                        <Button
                            onClick={() => signIn('github')}
                            startIcon={ <GitHub/>}>

                            Войти с помощью GitHub
                        </Button>
                        <Link onClick={e => loginHandler(e)} className={classes.login}>
                            Ещё нет аккаунта? Зарегистрируйтесь
                        </Link>
                    </Grid>
                </Card>
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
// LogIn.getInitialProps= async (context)=>{
//     const {req,res} = context
//     const session = await getSession({req})
//     if(session && res && session.acessToken){
//         res.writeHead(302, {
//             Location: '/'
//         })
//         res.end()
//         return
//     }
//     return {
//         session: undefined,
//         providers: await providers(),
//         csrfToken: await csrfToken(context)
//     }
// }
