import React, {useState} from 'react'
import {ITrack} from '../types/track'
import {Box, Grid, TextField} from '@material-ui/core'
import TrackItem from './TrackItem'
import classes from './TrackList.module.css'
import {useFormik} from 'formik'
import {searchTracks} from '../store/action-creators/track'
import {useDispatch} from 'react-redux'

interface TrackListProps{
    tracks: ITrack[]
    token: string
    userId: string
    view?: string
}
const TrackList: React.FC<TrackListProps> = ({tracks,token, userId,view}) => {
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
                await dispatch( searchTracks(values, token))
            }, 500)
        )
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label={'Найти трек'}
                    fullWidth
                    name={'query'}
                    value={formik.values.query}
                    onChange={async (e) => {
                        formik.handleChange(e)
                        await handleSearch(formik.values)
                    }}
                />
            </form>
            <Grid className={classes.grid} >
                <Box className={classes.box}>
                    {tracks.map(track=>
                        <TrackItem
                            key={track._id}
                            track={track}
                            token={token}
                            view={view}
                            userId={userId}
                        />
                    )}
                </Box>
            </Grid>
        </>

    )
}

export default TrackList