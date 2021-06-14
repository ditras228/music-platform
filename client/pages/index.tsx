import {Button, makeStyles} from '@material-ui/core'
import React from 'react'
import MainLayout from '../layouts/MainLayout'
import {useRouter} from 'next/router'
import {withAutoRedirect} from '../hooks/withAutoRedirect'

const useStyles = makeStyles({
    center: {
        marginTop: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
const Index =  () => {
    const router = useRouter()
    const classes = useStyles()
    return (
        <>
            <MainLayout/>
            <div className={classes.center}>
                <h1>Добро пожаловать</h1>
                <h3>Здесь собраны лучшие треки.</h3>
                <Button onClick={() => {
                    router.push('/tracks')
                }}>Начать</Button>
            </div>
        </>
    )
}
export default  Index