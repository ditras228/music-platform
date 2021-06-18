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
import {Login, Registration} from '../../store/action-creators/user'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {GetError} from '../../store/selectors'
import {withAutoRedirect} from '../../hooks/withAutoRedirect'

const SignupSchema = Yup.object({
    username: Yup.string().email('Неккоректный email').required('Обязательно'),
    password: Yup.string()
        .min(6, 'Должен быть больше 5 симолов')
        .max(16, 'Должен быть меньше 17 симолов')
        .required('Обязательно'),
})

const LogIn = () => {
    const router = useRouter()
    const {isAuth} = useTypedSelector(state => state.user)
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
            //  router.push('/tracks')
        }
    })
    const loginHandler=(e: any)=>{
        e.preventDefault()
        router.push('/auth/register')
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
                        <Link onClick={e=>loginHandler(e)}>
                            Ещё нет аккаунта? Зарегистрируйтесь
                        </Link>
                    </Grid>
                </Card>
            </form>
        </MainLayout>
    )
}

export default LogIn

