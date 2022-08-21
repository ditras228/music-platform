import React from "react";
import Image from "next/image";
import {imagesURL} from "../../api";
import classes from './play-album-image.module.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {fetchAlbum} from "../../store/action-creators/album";
import {useDispatch} from "react-redux";
import {IAlbum} from "../../types/album";

interface IPlayAlbumImage{
    album?: IAlbum,
    list?: boolean,
    token: string
}

const PlayAlbumImage = ({album, token, list}: IPlayAlbumImage) => {
    const player = useTypedSelector(state => state.player)
    const dispatch = useDispatch()

    const {pause, activeAlbum} = player

    const trackClickHandler = (e):void => {
        e.stopPropagation()
        dispatch(fetchAlbum(album.id, token))
    }

    let size = 170

    if(list){
        size = 70
    }

    return <div className={classes.playImage} onClick={e=>trackClickHandler(e)}>
        <Image width={size} height={size} src={imagesURL + album.image}
               className={classes.playImage__img} alt={'Обложка альбома'}/>

        {
            pause || activeAlbum?.id == album.id && <div className={classes.playImage__pauseIcon}/>
        }
        {
           list &&   activeAlbum?.id != album.id  &&<div className={classes.playImage__playIcon}/>
        }
    </div>

}
export default PlayAlbumImage
