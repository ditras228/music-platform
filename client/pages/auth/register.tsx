import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useFormik} from 'formik'
import {Checkbox, Button, Card, Grid, makeStyles, TextField, Link} from '@material-ui/core'
import {useRouter} from 'next/router'
import * as Yup from 'yup'
import {VpnKey} from '@material-ui/icons'
import {UsersAPI} from '../../api/usersAPI'
import classes from './register.module.css'
import {Alert} from '@material-ui/lab'

const SignupSchema = Yup.object({
    login: Yup.string().email('Неккоректный email').required('Обязательно'),
    password: Yup.string()
        .min(6, 'Должен быть больше 5 симолов')
        .max(16, 'Должен быть меньше 17 симолов')
        .required('Обязательно'),
    repeat_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пороли не совпадают')
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
    const loginHandler=(e: any)=>{
        e.preventDefault()
        router.push('/auth')
    }

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
                        &&  <Alert variant="filled" severity="error">
                            {formik.errors.login}
                        </Alert>}
                        <TextField
                            label={'Введите пороль'}
                            name={'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type={'password'}

                        />
                        {formik.touched.login && formik.errors.password
                        && <Alert variant="filled" severity="error">
                            {formik.errors.password}
                        </Alert>}
                        <TextField
                            label={'Повторите пороль'}
                            name={'repeat_password'}
                            value={formik.values.repeat_password}
                            onChange={formik.handleChange}
                            type={'password'}
                        />
                        {formik.touched.login && formik.errors.password
                        &&<Alert variant="filled" severity="error">
                            {formik.errors.repeat_password}
                        </Alert>
                        }
                        <Button
                        type={'submit'}>
                            Регистрация
                        </Button>
                        <Link onClick={e=>loginHandler(e)}>
                            Уже есть аккаунт? Войти
                        </Link>
                    </Grid>
                </Card>
            </form>
        </MainLayout>
    )
}

export default Register