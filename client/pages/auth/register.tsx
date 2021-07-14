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
import {Registration} from '../../store/action-creators/user'
import {GetError} from '../../store/selectors'
import {getSession} from 'next-auth/client'

const SignupSchema = Yup.object({
    email: Yup.string().email('Неккоректный email').required('Обязательно'),
    password: Yup.string()
        .min(6, 'Должен быть больше 5 симолов')
        .max(16, 'Должен быть меньше 17 симолов')
        .required('Обязательно'),
    repeat_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пороли не совпадают')
})

const Register = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const error = useSelector(state =>GetError(state, 'register'))

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeat_password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: async values => {
            dispatch(Registration(values.email, values.password))
        }
    })
    const loginHandler= async (e: any)=>{
        e.preventDefault()
        await router.push('/auth')
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
                            name={'email'}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.email && formik.errors.email
                        &&  <Alert variant="filled" severity="error">
                            {formik.errors.email}
                        </Alert>}
                        <TextField
                            label={'Введите пороль'}
                            name={'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type={'password'}

                        />
                        {formik.touched.email && formik.errors.email
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
                        {formik.touched.password && formik.errors.password
                        &&<Alert variant="filled" severity="error">
                            {formik.errors.repeat_password}
                        </Alert>
                        }
                        {error?
                            <Alert variant="filled" severity="error">
                                {error.message}
                            </Alert>: null}
                        <Button
                        type={'submit'}>
                            Регистрация
                        </Button>
                        <Link onClick={e=>loginHandler(e)} className={classes.login}>
                            Уже есть аккаунт? Войти
                        </Link>
                    </Grid>
                </Card>
            </form>
        </MainLayout>
    )
}

export default Register

export async function getServerSideProps({req,res}){
    const session = await getSession({req})
    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return({props:{session}})

}