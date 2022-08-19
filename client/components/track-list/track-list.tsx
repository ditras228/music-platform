import React, {useState} from 'react'
import classes from './track-list.module.scss'
import {Formik, useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {searchTracks} from "../../store/action-creators/track";
import TrackItem from "../track-item/track-item";
import {ITrack} from "../../types/track";
import InputField from "../../ui/input-field/input-field";

interface TrackListProps {
    tracks: ITrack[]
    token: string
    user_id: string
    view?: string
}

const TrackList: React.FC<TrackListProps> = ({tracks, token, user_id, view}) => {
    const [timer, setTimer] = useState(null)
    const dispatch = useDispatch();

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
        </>

    )
}

export default TrackList
