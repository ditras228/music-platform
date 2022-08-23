import React, {useState} from 'react'
import classes from './Album-search.module.scss'
import {Formik} from 'formik'
import {useDispatch} from 'react-redux'

interface AlbumSearchProps {
    token: string
    hideSearch?: boolean
}

const AlbumSearch: React.FC<AlbumSearchProps> = ({token, hideSearch}) => {
    const [timer, setTimer] = useState(null)
    const dispatch = useDispatch()

    const handleSearch =  (values) => {
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                // dispatch({type: AlbumActionTypes.SET_IS_FETCHING, payload: true})
                // dispatch(searchAlbums(values, token, 1))
            }, 500)
        )
    }

    return (
        <div className={classes.AlbumList}>
            {!hideSearch &&
                <Formik initialValues={{
                    query: '',
                }} onSubmit={(values) => {
                     handleSearch(values.query)
                }}

                >{(formik) =>
                    <div className={classes.AlbumSearch}>
                        <input
                            placeholder=" "
                            className={classes.AlbumSearch__field}
                            name={'query'}
                            value={formik.values.query}
                            onChange={e=>{
                                formik.handleChange(e)
                                formik.handleSubmit()
                            }}
                        />
                        <label className={classes.AlbumSearch__label}>Введите запрос</label>
                    </div>
                }
                </Formik>
            }
        </div>

    )
}

export default AlbumSearch
