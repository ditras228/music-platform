import React, {useEffect, useState} from 'react'
import classes from './track-list.module.scss'
import {Formik, useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {fetchTracks, searchTracks} from "../../store/action-creators/track";
import TrackItem from "../track-item/track-item";
import {ITrack, TrackActionTypes} from "../../types/track";
import InputField from "../../ui/input-field/input-field";
import {useRouter} from "next/router";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface TrackListProps {
    tracks: ITrack[]
    token: string
    user_id: number
    view?: string
    hideSearch?: boolean
}

const TrackList: React.FC<TrackListProps> = ({tracks, token, user_id, view, hideSearch}) => {
    const [timer, setTimer] = useState(null)
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
        <div className={classes.trackList}>
            {!hideSearch &&
                <Formik initialValues={{
                    query: '',
                }} onSubmit={(values) => {
                    handleSearch(values.query)
                }}>{(formik) =>
                    <div className={classes.trackList__search}>
                        <InputField
                            label={'Введите запрос'}
                            name={'query'}
                            value={formik.values.query}

                        />
                    </div>
                }
                </Formik>
            }
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
