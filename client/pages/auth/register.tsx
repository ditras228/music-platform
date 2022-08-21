import React, {useEffect} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Formik} from 'formik'
import {useRouter} from 'next/router'
import * as Yup from 'yup'
import classes from './register.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {Registration} from '../../store/action-creators/user'
import {GetError} from '../../store/selectors'
import {getSession} from 'next-auth/client'
import {wrapper} from '../../store'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import InputField from "../../ui/input-field/input-field";

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

    const loginHandler = async (e: any) => {
        e.preventDefault()
        await router.push('/')
    }
    useEffect(() => {
        router.push(redirectTo)
    }, [redirectTo])

    return (
        <MainLayout>
            <Formik initialValues={{
                name: '',
                email: '',
                password: '',
                repeat_password: '',
            }} onSubmit={(values) => {
                dispatch(Registration(values.name, values.email, values.password))
            }} validationSchema={SignupSchema}>{(formik) =>
                <div
                    className={classes.register}>
                    <h2 className={classes.register__title}>Регистрация</h2>
                    <div
                        className={classes.register__content}
                    >
                        <div className={classes.register__content__inputs}>
                            <InputField
                                label={'Имя'}
                                name={'name'}
                                value={formik.values.name}
                            />
                            <InputField
                                label={'Email'}
                                name={'email'}
                                value={formik.values.email}
                            />
                            <InputField
                                label={'Пароль'}
                                name={'password'}
                                value={formik.values.password}
                                type={'password'}

                            />
                            <InputField
                                label={'Повторите пароль'}
                                name={'repeat_password'}
                                value={formik.values.repeat_password}
                                type={'password'}
                            />
                            {error ?
                                <div>
                                    {error.message}
                                </div> : null}
                        </div>
                        <div className={classes.register__content__buttons}>
                            <button
                                className={classes.register__content__buttons__item}
                                onClick={()=>formik.handleSubmit()}>
                                Регистрация
                            </button>
                        </div>
                        <div onClick={e => loginHandler(e)} className={classes.register__content__link}>
                            Уже есть аккаунт? Войти
                        </div>
                    </div>
                </div>}
            </Formik>
        </MainLayout>
    )
}

export default Register

export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const session = await getSession({req: ctx.req})

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
