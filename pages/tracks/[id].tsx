import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import {Button, Grid, TextField} from '@material-ui/core'
import {useRouter} from 'next/router'

const TrackPage = () => {
    const track =         {_id: 1, artist: 'a1', audio: '', comments: [], listens: 5, name: 'name 1', picture: '', text: 'text'}
        const router=useRouter()
    return (
        <MainLayout>
            <Button
                variant={'outlined'}
                style={{fontSize: 32}}
                onClick={()=>router.push('/tracks')}
                >
                К списку
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={track.picture} width={200}  height= {200}/>
                <div style={{marginLeft: '30px'}}>
                    <h1>Имя- {track.name}</h1>
                    <h1>Автор - {track.artist}</h1>
                    <h1>Прослушивний - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Слова к песне</h1>
            <p>{track.text}</p>
            <h1>Комментарии</h1>
            <Grid container>
                <TextField
                    label='Ваше имя'
                    fullWidth
                >
                </TextField>
                <TextField
                    label='Комментарий'
                    fullWidth
                    multiline
                    rows={4}
                >
                </TextField>
                <Button>Отправить</Button>
            </Grid>
            {track.comments.map(comment=>
                <div>
                    <div>Автор - {comment.username}</div>
                    <div>Комментарий - {comment.text}</div>
                </div>
            )}
        </MainLayout>
    )
}

export default TrackPage