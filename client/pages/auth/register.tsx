import React, {useEffect} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useFormik} from 'formik'
import {Button, Card, Grid, Link, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import * as Yup from 'yup'
import {VpnKey} from '@material-ui/icons'
import classes from './register.module.css'
import {Alert} from '@material-ui/lab'
import {useDispatch, useSelector} from 'react-redux'
import {Registration} from '../../store/action-creators/user'
import {GetError} from '../../store/selectors'
import {getSession} from 'next-auth/client'
import {NextThunkDispatch, wrapper} from '../../store'
import cookies from 'next-cookies'
import {UsersActionTypes} from '../../types/user'
import {useTypedSelector} from '../../hooks/useTypedSelector'

const SignupSchema = Yup.object({
    name: Yup.string().min(3, 'Минимум 3 символа').max(12, 'Максимум 12 символов'),
    email: Yup.string().email('Неккоректный email').required('Обязательно'),
    password: Yup.string()
        .min(6, 'Должен быть больше 5 симолов')
        .max(16, 'Должен быть меньше 17 симолов')
        .required('Обязательно'),
    repeat_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
})

const Register = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const error = useSelector(state => GetError(state, 'register'))
    const redirectTo = useTypedSelector(state => state.user.redirectTo)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repeat_password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: async values => {
            dispatch(Registration(values.name, values.email, values.password))
        }
    })
    const loginHandler = async (e: any) => {
        e.preventDefault()
        await router.push('/')
    }
    useEffect(() => {
        router.push(redirectTo)
    }, [redirectTo])

    return (
        <MainLayout>
            <form onSubmit={formik.handleSubmit}>
                <Card
                    className={classes.card}>
                    <h2 className={classes.title}><VpnKey/> Регистрация</h2>
                    <Grid
                        className={classes.form}
                    >
                        <TextField
                            label={'Введите ник'}
                            name={'name'}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
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
                            label={'Введите пароль'}
                            name={'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type={'password'}

                        />
                        {formik.touched.password && formik.errors.password
                        && <Alert variant="filled" severity="error">
                            {formik.errors.password}
                        </Alert>}
                        <TextField
                            label={'Повторите пароль'}
                            name={'repeat_password'}
                            value={formik.values.repeat_password}
                            onChange={formik.handleChange}
                            type={'password'}
                        />
                        {formik.touched.password && formik.errors.repeat_password
                        && <Alert variant="filled" severity="error">
                            {formik.errors.repeat_password}
                        </Alert>
                        }
                        {error ?
                            <Alert variant="filled" severity="error">
                                {error.message}
                            </Alert> : null}
                        <Button
                            type={'submit'}>
                            Регистрация
                        </Button>
                        <Link onClick={e => loginHandler(e)} className={classes.login}>
                            Уже есть аккаунт? Войти
                        </Link>
                    </Grid>
                </Card>
            </form>
        </MainLayout>
    )
}

export default Register

export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const theme = cookies(ctx).theme
    const session = await getSession({req: ctx.req})
    dispatch({
        type: UsersActionTypes.HANDLE_CHANGE_DARK,
        payload: theme || false
    })
    if (session) {
        return {
            redirect: {
                destination: '/tracks',
                permanent: false,
            },
        }
    }

    return ({props: {session}})

})