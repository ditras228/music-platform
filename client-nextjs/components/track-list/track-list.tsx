import React, {useEffect} from 'react'
import classes from './track-list.module.scss'
import {useDispatch} from 'react-redux'
import {fetchTracks} from "../../store/action-creators/track";
import TrackItem from "../track-item/track-item";
import {ITrack, TrackActionTypes} from "../../types/track";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import TrackSearch from "../track-search/track-search";

interface TrackListProps {
    tracks: ITrack[]
    token: string
    user_id: number
    view?: string
    hideSearch?: boolean
}

const TrackList: React.FC<TrackListProps> = ({tracks, token, user_id, view, hideSearch}) => {
    const { total, current_page, isFetching} = useTypedSelector(state => state.track)
    const dispatch = useDispatch()

    useEffect(()=>{
        document.addEventListener('scroll', scrollHandler);

        return function (){
            document.removeEventListener('scroll', null)
        }
    },[])

    useEffect(()=>{
        if(isFetching===true && total != tracks.length){
            dispatch(fetchTracks(token,current_page+1))
        }
    }, [isFetching])

    const scrollHandler=(e): void=> {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            dispatch({type: TrackActionTypes.SET_IS_FETCHING, payload: true})
        }
    }

    return (
        <div className={classes.trackList}>
           <TrackSearch token={token} hideSearch={hideSearch}></TrackSearch>
            <div className={classes.trackList__content}>
                    {tracks.map(track =>
                        <TrackItem
                            key={track.id}
                            track={track}
                            token={token}
                            view={view}
                            userId={user_id}
                        />
                    )}
            </div>
        </div>

    )
}

export default TrackList
