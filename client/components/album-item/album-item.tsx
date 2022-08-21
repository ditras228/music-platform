import React from 'react'
import {useRouter} from 'next/router'
import {imagesURL} from '../../api'
import {useDispatch} from 'react-redux'
import classes from './album-item.module.scss'
import {IAlbum} from '../../types/album'
import {deleteAlbum} from "../../store/action-creators/album";
import Image from 'next/image'

interface AlbumItemProps {
    album: IAlbum
    token: string
    userId: number
}

const AlbumItem: React.FC<AlbumItemProps> = ({album, token, userId}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const deleteOne = async () => {
        dispatch(deleteAlbum(album.id, token))
    }

    return (
        <div className={classes.album}>
            <SwitchView deleteOne={deleteOne}
                        album={album}
                        userId={userId}/>
            <div className={classes.album__info}
                 onClick={() => {
                     router.push('/albums/' + album.id)
                 }
                 }>
                <Image className={classes.album__image} src={imagesURL + album.image} alt={'Обложка альбома'} width={70}
                       height={70}/>
                <div className={classes.album__name}>
                    <div>{album.name}</div>
                    <div className={classes.album__author}>{album.author}</div>
                </div>
            </div>

        </div>
    )
}
interface ISwitchVIew{
    deleteOne: any
    userId: number,
    album: IAlbum
}

const SwitchView = ({deleteOne, userId, album}: ISwitchVIew) => {
    const isNotOwner = userId != album.user_id
    return <button disabled={isNotOwner} className={classes.album__delete} onClick={deleteOne}>
    </button>

}

export default AlbumItem
