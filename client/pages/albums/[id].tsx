import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Button, Card, Grid, makeStyles, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'
import {GetServerSideProps} from 'next'
import {TracksAPI} from '../../api/tracksAPI'
import {baseURL} from '../../api'
import {useFormik} from 'formik'
import {ITrack} from '../../types/track'
import {ArrowBackIos, GTranslate, Hearing, InsertComment, Person, Title} from '@material-ui/icons'
import {withAutoRedirect} from '../../hooks/withAutoRedirect'
import classes from './[id].module.css'
import cookies from 'next-cookies'
import TrackList from '../../components/TrackList'

const TrackPage = ({serverAlbum, token}) => {
    const router = useRouter()
    return (
        <MainLayout
            title={'Музыкальная площадка - ' + serverAlbum.name + ' - ' + serverAlbum.artist}
            keywords={'Музыка, артисты,' + serverAlbum.name + serverAlbum.artist}
        >
            <Grid container className={classes.grid}>
                <Button
                    variant={'outlined'}
                    style={{fontSize: 32}}
                    onClick={() => router.push('/tracks')}
                >
                    <ArrowBackIos/> К списку
                </Button>
                <Card>
                    <Grid container className={classes.info}>
                        <img src={baseURL + serverAlbum.picture} className={classes.img} alt={'Обложка альбома'}/>
                        <div style={{marginLeft: '30px'}}>
                            <div className={classes.line}>
                                <h2 className={classes.item_title}><Title/>Название</h2>
                                <h2 className={classes.item_value}>{serverAlbum.name}</h2>
                            </div>
                            <div className={classes.line}>
                                <h2 className={classes.item_title}><Person/>Автор</h2>
                                <h2 className={classes.item_value}>{serverAlbum.artist}</h2>
                            </div>
                            <div className={classes.line}>
                                <h2 className={classes.item_title}><Hearing/>Прослушиваний</h2>
                                <h2 className={classes.item_value}>{serverAlbum.listens}</h2>
                            </div>
                        </div>
                    </Grid>
                </Card>
                <Card className={classes.card}>
                    <h2 className={classes.title}><GTranslate/> Описание альбома</h2>
                    <p className={classes.text}>{serverAlbum.text}</p>
                    <TrackList tracks={serverAlbum.tracks} token={token}/>
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default TrackPage
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = cookies(ctx).token;
    const response = await TracksAPI.getOne(ctx.params.id, token)
    return {
        props: {
            serverAlbum: response.data,
            token: token
        }

    }
}