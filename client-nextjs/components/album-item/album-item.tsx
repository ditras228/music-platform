import React from 'react'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import classes from './album-item.module.scss'
import {IAlbum} from '../../types/album'
import {deleteAlbum, fetchAlbum} from "../../store/action-creators/album";
import PlayAlbumImage from "../play-album-image/play-album-image";

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

    function clickHandler(e) {
        e.stopPropagation()
        dispatch(fetchAlbum(album.id, token))
    }

    return (
        <div className={classes.album} onClick={() => {
            router.push('/albums/' + album.id)
        }
        }>
            <SwitchView deleteOne={deleteOne}
                        album={album}
                        userId={userId}/>
            <div className={classes.album__info}
            >
                <div onClick={e => clickHandler(e)}>
                    <PlayAlbumImage token={token} album={album} list={true}/>
                </div>

                <div className={classes.album__name}>
                    <div>{album.name}</div>
                    <div className={classes.album__author}>{album.author}</div>
                </div>
            </div>

        </div>
    )
}

interface ISwitchVIew {
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
