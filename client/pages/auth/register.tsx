import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useFormik} from 'formik'
import {Checkbox, Button, Card, Grid, makeStyles, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import * as Yup from 'yup'
import {VpnKey} from '@material-ui/icons'
import {UsersAPI} from '../../api/usersAPI'
import classes from './register.module.css'

const SignupSchema = Yup.object({
    email: Yup.string().email('Неккоректный email').required('Обязательно'),
    password: Yup.string()
        .min(6, 'Должен быть больше 5 симолов')
        .max(16, 'Должен быть меньше 17 симолов')
        .required('Обязательно'),
})

const Register = () => {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            repeat_password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: async values => {
            await UsersAPI.registration(values)
          //  router.push('/tracks')
        }
    })
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
                            label={'Введите Email'}
                            name={'login'}
                            value={formik.values.login}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.login && formik.errors.login
                        && <div>{formik.errors.login}</div>}
                        <TextField
                            label={'Введите пороль'}
                            name={'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.login && formik.errors.password
                        && <div>{formik.errors.password}</div>}
                        <TextField
                            label={'Повторите пороль'}
                            name={'repeat_password'}
                            value={formik.values.repeat_password}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.login && formik.errors.password
                        && <div>{formik.errors.password}</div>}
                        <Button>
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

export default Register