import React from 'react'
import {useRouter} from 'next/router'
import {filesURL} from '../../api'
import {useDispatch} from 'react-redux'
import classes from './album-item.module.scss'
import {IAlbum} from '../../types/album'
import {deleteAlbum} from "../../store/action-creators/album";

interface AlbumItemProps {
    album: IAlbum
    token: string
    userId: string
}

const AlbumItem: React.FC<AlbumItemProps> = ({album, token, userId}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const deleteOne = async () => {
        dispatch(deleteAlbum(album.id, token))
    }
    const isNotOwner = album.userId != userId

    return (
        <div className={classes.track}>
            <img className={classes.image} src={filesURL + album.picture} alt={'Обложка альбома'}/>
            <div className={classes.name} onClick={() => router.push('/albums/' + album.id)}>
                <div>{album.name}</div>
                <div className={classes.author}>{album.author}</div>
            </div>
            <button disabled={isNotOwner} className={classes.delete} onClick={e => e.stopPropagation()}>
                <div onClick={deleteOne}/>
            </button>
        </div>
    )
}
export default AlbumItem
