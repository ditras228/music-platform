import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useFormik} from 'formik'
import {Checkbox, Button, Card, Grid, makeStyles, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import * as Yup from 'yup'
import {VpnKey} from '@material-ui/icons'
import {UsersAPI} from '../../api/usersAPI'

const useStyles = makeStyles({
    form: {
        display: 'grid',
        gridTemplateRows: 'auto',
        gridTemplateColumns: '1fr',
        gridRowGap: '10px'
    },
    card: {
        padding: '20px',
        margin: '0 auto',
        maxWidth: '600px'
    },
    title: {
        marginLeft: '10px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gridGap: '10px'
    }
})

const SignupSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
})

const Register = () => {
    const router = useRouter()
    const classes = useStyles()
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            repeat_password: '',
            authMe: false
        },
        validationSchema: SignupSchema,
        onSubmit: async values => {
            await UsersAPI.registration(values)
            // router.push('/tracks')
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
                        <div>
                            <Checkbox
                                name={'authMe'}
                                checked={formik.values.authMe}
                                onChange={formik.handleChange}
                            />Запомнить меня
                        </div>
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