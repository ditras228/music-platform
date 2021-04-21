import {Button} from '@material-ui/core'
import React from 'react'
import s from './index.module.css'
import MainLayout from '../layouts/MainLayout'
const Index = () => {
    return (
        <>
                <MainLayout/>
            <div className={s.center}>
                <h1>Добро пожаловать</h1>
                <h3>Здесь собраны лучшие треки</h3>
                <Button>Кнопка</Button>
            </div>
        </>
    )
}

export default Index