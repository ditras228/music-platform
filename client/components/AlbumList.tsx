import React, {useState} from 'react'
import {Box, Grid, TextField} from '@material-ui/core'
import classes from './TrackList.module.css'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import AlbumItem from './AlbumItem'
import {searchAlbums} from '../store/action-creators/album'

interface AlbumListProps{
    albums: IAlbum[]
    token: string
}
const AlbumList: React.FC<AlbumListProps> = ({albums,token}) => {
    const [timer, setTimer] = useState(null)
    const dispatch = useDispatch()  
    const formik = useFormik({
        initialValues: {
            query: ''
        },
        onSubmit: async values => {
            await handleSearch(values)
        },
    })
    const handleSearch = async (values) => {
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch( searchAlbums(values, token))
            }, 500)
        )
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label={'Найти альбом'}
                    fullWidth
                    name={'query'}
                    value={formik.values.query}
                    onChange={async (e) => {
                        formik.handleChange(e)
                        await handleSearch(formik.values)
                    }}
                />
            </form>
            <Grid container direction={'column'} >
                <Box p={0} className={classes.box}>
                    {albums.map(album=>
                        <AlbumItem
                            key={album._id}
                            album={album}
                            token={token}
                        />
                    )}
                </Box>
            </Grid>
        </>

    )
}

export default AlbumList