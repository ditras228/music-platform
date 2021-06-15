import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useFormik} from 'formik'
import {Checkbox, Button, Card, Grid, makeStyles, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import * as Yup from 'yup'
import {VpnKey} from '@material-ui/icons'
import {useDispatch} from 'react-redux'
import cookieCutter from 'cookie-cutter'
import {UsersAPI} from '../../api/usersAPI'
import Alert from '@material-ui/lab/Alert';
import classes from './index.module.css'

const SignupSchema = Yup.object({
    email: Yup.string().email('Неккоректный email').required('Обязательно'),
    password: Yup.string()
        .min(6, 'Должен быть больше 5 симолов')
        .max(16, 'Должен быть меньше 17 симолов')
        .required('Обязательно'),
})

const LogIn = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: async values => {
            cookieCutter.set('auth_token', 'some-value')
            console.log('кука '+ cookieCutter.get('myCookieName'))
            await UsersAPI.login(values)
        }

    })
    return (
        <MainLayout>
            <form onSubmit={formik.handleSubmit}>
                <Card
                    className={classes.card}>
                    <h2 className={classes.title}><VpnKey/> Войти</h2>
                    <Grid
                        className={classes.form}
                    >
                        <TextField
                            label={'Введите Email'}
                            name={'login'}
                            value={formik.values.login}
                            onChange={formik.handleChange}
                        >
                            Логин
                        </TextField>
                        {formik.touched.login && formik.errors.login
                        && <div>{formik.errors.login}</div>}
                        <TextField
                            label={'Введите пороль'}
                            name={'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        >
                            Пороль
                        </TextField>
                        {formik.touched.login && formik.errors.password
                        && <div>{formik.errors.password}</div>}
                        <Button
                            onClick={() => router.push('auth/register')}
                        >
                            Регистрация
                        </Button>
                        <Button
                            type={'submit'}>
                            Войти
                        </Button>
                    </Grid>
                </Card>
            </form>
        </MainLayout>
    )
}

export default LogIn