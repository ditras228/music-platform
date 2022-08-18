import React, {useState} from 'react'
import classes from '../track-list/track-list.module.scss'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import AlbumItem from '../album-item/album-item'
import {searchAlbums} from '../../store/action-creators/album'
import {IAlbum} from '../../types/album'

interface AlbumListProps {
    albums: IAlbum[]
    token: string
    userId: string
}

const AlbumList: React.FC<AlbumListProps> = ({albums, token, userId}) => {
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
                await dispatch(searchAlbums(values, token))
            }, 500)
        )
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <input
                    name={'query'}
                    value={formik.values.query}
                    onChange={async (e) => {
                        formik.handleChange(e)
                        await handleSearch(formik.values)
                    }}
                    style={{marginBottom: 20}}

                />
            </form>
            <div>
                <div p={0} className={classes.box}>
                    {albums.map(album =>
                        <AlbumItem
                            key={album.id}
                            album={album}
                            token={token}
                            userId={userId}
                        />
                    )}
                </div>
            </div>
        </>

    )
}

export default AlbumList
