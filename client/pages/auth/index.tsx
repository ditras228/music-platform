import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useFormik} from 'formik'
import {Button, Card, Grid, Link, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import * as Yup from 'yup'
import {VpnKey} from '@material-ui/icons'
import classes from './register.module.css'
import {Alert} from '@material-ui/lab'
import {useDispatch, useSelector} from 'react-redux'
import {Auth, Login} from '../../store/action-creators/user'
import {GetError} from '../../store/selectors'
import {withAutoRedirect} from '../../hooks/withAutoRedirect'
import {NextThunkDispatch, wrapper} from '../../store'
import cookies from 'next-cookies'

const SignupSchema = Yup.object({
    username: Yup.string().email('Неккоректный email').required('Обязательно'),
    password: Yup.string()
        .min(6, 'Должен быть больше 5 символов')
        .max(16, 'Должен быть меньше 17 символов')
        .required('Обязательно'),
})

const LogIn = ({isAuth}) => {
    const router = useRouter()
    withAutoRedirect(true, isAuth,  router )
    const dispatch = useDispatch()
    const error = useSelector(state =>GetError(state, 'login'))
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: async values => {
            dispatch(Login(values.username, values.password))
             await router.push('/')
        }
    })
    const loginHandler= async (e: any)=>{
        e.preventDefault()
        await router.push('/auth/register')
    }

    return (
        <MainLayout>
            <form onSubmit={formik.handleSubmit}>
                <Card
                    className={classes.card}>
                    <h2 className={classes.title}><VpnKey/> Вход</h2>
                    <Grid
                        className={classes.form}
                    >
                        <TextField
                            label={'Введите Email'}
                            name={'username'}
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.username && formik.errors.username
                        &&  <Alert variant="filled" severity="error">
                            {formik.errors.username}
                        </Alert>}
                        <TextField
                            label={'Введите пороль'}
                            name={'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type={'password'}

                        />
                        {formik.touched.username && formik.errors.password
                        && <Alert variant="filled" severity="error">
                            {formik.errors.password}
                        </Alert>}
                        {error?
                         <Alert variant="filled" severity="error">
                            {error.message}
                        </Alert>: null}
                        <Button
                            type={'submit'}>
                            Войти
                        </Button>
                        <Link onClick={e=>loginHandler(e)} className={classes.login}>
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
    const token = cookies(ctx).token;
    await dispatch( Auth())
    const isAuth = cookies(ctx).isAuth;
    return {
        props:{
            token: token || null,
            isAuth: isAuth || null
        }
    }
})

