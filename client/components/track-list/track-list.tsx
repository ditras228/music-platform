import React, {useState} from 'react'
import {Box, Grid, TextField} from '@material-ui/core'
import classes from './TrackList.module.css'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {searchTracks} from "../../store/action-creators/track";
import TrackItem from "../TrackItem/TrackItem";
import {ITrack} from "../../types/track";

interface TrackListProps {
    tracks: ITrack[]
    token: string
    user_id: string
    view?: string
}

const TrackList: React.FC<TrackListProps> = ({tracks, token, user_id, view}) => {
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
                await dispatch(searchTracks(values, token))
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
                    style={{marginBottom: 20}}
                />
            </form>
            <Grid className={classes.grid}>
                <Box className={classes.box}>
                    {tracks.map(track =>
                        <TrackItem
                            key={track.id}
                            track={track}
                            token={token}
                            view={view}
                            userId={user_id}
                        />
                    )}
                </Box>
            </Grid>
        </>

    )
}

export default TrackList
