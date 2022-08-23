import React, {useState} from 'react'
import {ITrack} from '../../types/track'
import {useRouter} from 'next/router'
import {useActions} from '../../hooks/useAction'
import {baseURL, imagesURL} from '../../api'
import {useDispatch} from 'react-redux'
import classes from './track-item.module.scss'
import {useFormikContext} from 'formik'
import {deleteTrack, fetchTracks} from "../../store/action-creators/track";
import Image from "next/image";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import PlayImage from "../play-image/play-image";

interface TrackItemProps {
    track: ITrack
    active?: boolean
    view?: string
    token: string
    userId: number
}

type formik = {
    name: '',
    artist: '',
    picture: undefined,
    tracks: Array<string>
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false, view, userId, token}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isChecked, setChecked] = useState(false)
    const formik = useFormikContext<formik>()
    const {setPreview} = useActions()
    const player = useTypedSelector(state => state.player)
    const {pause} = player

    const deleteOne = (): void => {
        dispatch(deleteTrack(track.id, token))
    }

    const editState = (): void => {
        if (formik) {
            setChecked(!isChecked)
            if (isChecked === false) {
                formik.setFieldValue('tracks', [...formik.values.tracks, track.id], true)
            }
            if (isChecked === true) {
                formik.setFieldValue('tracks', [...formik.values.tracks.filter(thisTrack => thisTrack !== track.id)], true)
            }
        }
    }

    return (
        <div className={classes.track} onClick={() => {
            view !== 'checkbox'
                ? router.push('/tracks/' + track.id)
                : editState()
        }
        }>
            <SwitchView view={view}
                        checked={isChecked}
                        deleteOne={deleteOne}
                        track={track}
                        userId={userId} editState={editState}/>

            <div className={classes.track__info}
            >
                <PlayImage track={track} list={true} token={token}></PlayImage>
                <div className={classes.track__name}>
                    <div>{track.name}</div>
                    <div className={classes.track__author}>{track.artist}</div>
                </div>
            </div>

        </div>
    )
}

const SwitchView = ({view, deleteOne, checked, userId, track, editState}) => {
    const isNotOwner = userId != track.user_id

    switch (view) {
        case 'checkbox':
            return (
                <input type='checkbox' checked={checked} onChange={() => editState()} name="checkbox"
                       className={classes.track__delete}/>
            )
        default:
            return (
                <button disabled={isNotOwner} className={classes.track__delete} onClick={deleteOne}>
                </button>
            )

    }
}
export default TrackItem
