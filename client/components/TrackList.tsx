import React from 'react'
import {ITrack} from '../types/track'
import {Box, Grid} from '@material-ui/core'
import TrackItem from './TrackItem'
import {makeStyles} from '@material-ui/styles'

interface TrackListProps{
    tracks: ITrack[]
}
const useStyles = makeStyles({
    box: {
        '&:last-child': {
            marginBottom: '-5px'
        }
    }
})
const TrackList: React.FC<TrackListProps> = ({tracks}) => {
    const classes = useStyles();
    return (
        <Grid container direction={'column'} >
            <Box p={0} className={classes.box}>
                {tracks.map(track=>
                <TrackItem
                    key={track._id}
                    track={track}
                />
                )}
            </Box>
        </Grid>
    )
}

export default TrackList