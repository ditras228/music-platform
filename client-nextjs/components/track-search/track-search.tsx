import React, {useState} from 'react'
import classes from './track-search.module.scss'
import {Formik} from 'formik'
import {useDispatch} from 'react-redux'
import {searchTracks} from "../../store/action-creators/track";

interface TrackSearchProps {
    token: string
    hideSearch?: boolean
}

const TrackSearch: React.FC<TrackSearchProps> = ({token, hideSearch}) => {
    const [timer, setTimer] = useState(null)
    const dispatch = useDispatch()

    const handleSearch =  (values) => {
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                dispatch(searchTracks(values, token, 1))
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
                }}

                >{(formik) =>
                    <div className={classes.trackSearch}>
                        <input
                            placeholder=" "
                            className={classes.trackSearch__field}
                            name={'query'}
                            value={formik.values.query}
                            onChange={e=>{
                                formik.handleChange(e)
                                formik.handleSubmit()
                            }}
                        />
                        <label className={classes.trackSearch__label}>Введите запрос</label>
                    </div>
                }
                </Formik>
            }
        </div>

    )
}

export default TrackSearch
