import React from 'react'
import {useRouter} from 'next/router'
import {imagesURL} from '../../api'
import {useDispatch} from 'react-redux'
import classes from './album-item.module.scss'
import {IAlbum} from '../../types/album'
import {deleteAlbum} from "../../store/action-creators/album";
import Image from 'next/image'
import PlayImage from "../play-image/play-image";
import {PlayerActionTypes} from "../../types/player";

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

    function clickHandler(e){
        e.stopPropagation()
        dispatch({
            type: PlayerActionTypes.SET_ACTIVE__ALBUM, album

        })
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
                <div onClick={e=>clickHandler(e)}>
                    123123
                    {
                        album.tracks.length &&                   <PlayImage list={true} track={album.tracks[0]}></PlayImage>

                    }
                </div>

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
