import React, {useEffect} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {useFormik} from 'formik'
import {Button, Card, Grid, Link, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import classes from './index.module.css'
import {Check} from '@material-ui/icons'


const RegSuccess = () => {
    const router = useRouter()
    return (
        <MainLayout>
            <Card className={classes.error}>
                <Button>
                    <Check/>
                </Button>
                <h2>Спасибо за регистрацию! Проверьте свою почту</h2>
            </Card>
        </MainLayout>
    )
}

export default RegSuccess
